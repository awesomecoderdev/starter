// import { NextApiHandler } from 'next';
// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// import { stripe } from '@/utils/stripe';
// import { createOrRetrieveCustomer } from '@/utils/supabase-admin';
// import { getURL } from '@/utils/helpers';

// const CreateCheckoutSession: NextApiHandler = async (req, res) => {
//   if (req.method === 'POST') {
//     const { price, quantity = 1, metadata = {} } = req.body;

//     try {
//       const supabase = createServerSupabaseClient({ req, res });
//       const {
//         data: { user }
//       } = await supabase.auth.getUser();

//       const customer = await createOrRetrieveCustomer({
//         uuid: user?.id || '',
//         email: user?.email || ''
//       });

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         billing_address_collection: 'required',
//         customer,
//         line_items: [
//           {
//             price: price.id,
//             quantity
//           }
//         ],
//         mode: 'subscription',
//         allow_promotion_codes: true,
//         subscription_data: {
//           trial_from_plan: true,
//           metadata
//         },
//         success_url: `${getURL()}/account`,
//         cancel_url: `${getURL()}/`
//       });

//       return res.status(200).json({ sessionId: session.id });
//     } catch (err: any) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ error: { statusCode: 500, message: err.message } });
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// };

// export default CreateCheckoutSession;

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import { getAppUrl, jwtSecret } from "@/utils/utils";
import { stripe } from "@/utils/stripe";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		user: object;
	}
}

// export const runtime = "edge";
export const revalidate = 2;

export async function POST(request: Request) {
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;
	// const user = await prisma.user.findFirst();
	// var secret = fs.readFileSync("public.pem"); // get public key
	const token = JwtToken?.value;
	const req = await request.json();
	const { price, quantity = 1, metadata = {} } = req;

	try {
		const getUserEmail = () => {
			try {
				let { user, exp } = (<jwt.JwtPayload>(
					jwt.verify(`${token}`, `${jwtSecret}`)
				)) as { user?: any; exp?: any };

				if (user) {
					return user?.email;
				}
			} catch (error) {
				// skip
			}
			return null;
		};

		if (!getUserEmail) {
			const expired = new Date(2000);
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_UNAUTHORIZED,
					message: "Session has been expired.",
					reload: true,
				}),
				{
					status: Status.HTTP_OK,
					headers: {
						"Set-Cookie": `token=deleted; Path=/; Expires=${expired};`,
					},
				}
			);
		}

		const customer: any = await prisma.user.findUnique({
			where: {
				email: getUserEmail(),
			},
		});

		if (customer) {
			try {
				// const customer = await createOrRetrieveCustomer({
				// 	uuid: user?.id || "",
				// 	email: user?.email || "",
				// });

				const session = await stripe.checkout.sessions.create({
					payment_method_types: ["card"],
					billing_address_collection: "required",
					customer,
					line_items: [
						{
							price: price.id,
							quantity,
						},
					],
					mode: "subscription",
					allow_promotion_codes: true,
					subscription_data: {
						trial_from_plan: true,
						metadata,
					},
					success_url: `${getAppUrl()}/billing`,
					cancel_url: `${getAppUrl()}/`,
				});

				return new Response(
					JSON.stringify({
						success: true,
						status: Status.HTTP_OK,
						message: "Successfully Authorized.",
						data: {
							sessionId: session.id,
						},
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			} catch (err: any) {
				console.log(err);
				return new Response(
					JSON.stringify({
						success: false,
						status: Status.HTTP_INTERNAL_SERVER_ERROR,
						message: "Something went wrong.",
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			}
		} else {
			throw new Error(`${Status.HTTP_MESSAGE_UNAUTHORIZED}`);
		}
	} catch (error) {
		const expired = new Date(2000);
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_UNAUTHORIZED,
				message: "Session has been expired.",
				reload: true,
			}),
			{
				status: Status.HTTP_OK,
				// headers: {
				// 	"Set-Cookie": `token=deleted; Path=/; Expires=${expired};`,
				// },
			}
		);
	}
}

export {
	MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
