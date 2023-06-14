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

type SessionRequest = {
	session: string;
};

interface ContextProps {
	params: SessionRequest;
}

export async function POST(request: Request, context: ContextProps) {
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const token = JwtToken?.value;
	const search = new URL(request.url);
	const searchParams = search.searchParams;
	const user_id = searchParams.get("user_id");
	const session_id = context.params.session ?? null;
	const customer_id = searchParams.get("customer_id");

	// return new Response(
	// 	JSON.stringify({
	// 		success: true,
	// 		status: Status.HTTP_OK,
	// 		message: "Successfully Authorized.",
	// 		data: {
	// 			customer_id: searchParams.get("customer_id"),
	// 			user_id: searchParams.get("user_id"),
	// 			session_id,
	// 		},
	// 	}),
	// 	{
	// 		status: Status.HTTP_OK,
	// 	}
	// );

	console.log("\nrequest recived\n");

	try {
		if (!user_id || !customer_id) {
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_NOT_FOUND,
					message: `${Status.HTTP_MESSAGE_NOT_FOUND}.`,
				}),
				{
					status: Status.HTTP_OK,
				}
			);
		}

		const customer: any = await prisma.user.findFirst({
			where: {
				id: user_id,
				stripeId: customer_id,
			},
		});

		if (!customer) {
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_NOT_FOUND,
					message: `${Status.HTTP_MESSAGE_NOT_FOUND}.`,
				}),
				{
					status: Status.HTTP_OK,
				}
			);
		}

		if (customer) {
			try {
				const sessions = await stripe.checkout.sessions.retrieve(
					`${session_id}`
				);

				if (sessions.customer != customer_id) {
					return new Response(
						JSON.stringify({
							success: false,
							status: Status.HTTP_NOT_FOUND,
							message: `${Status.HTTP_MESSAGE_NOT_FOUND}.`,
						}),
						{
							status: Status.HTTP_OK,
						}
					);
				}

				// const subscription = await stripe.subscriptions.retrieve(
				// 	`${`${sessions.subscription}`}`
				// );

				// const subscriptionFromDB = await prisma.subscription.findFirst({
				// 	where: {
				// 		stripe_id: `${sessions.subscription}`,
				// 	},
				// });

				// if (subscription && !subscriptionFromDB) {
				// 	// const newSubscription = await prisma.subscription.create({
				// 	// 	data: {
				// 	// 		userId: user_id,
				// 	// 		name: "Basic",
				// 	// 		quantity: 1,
				// 	// 		stripe_status: subscription.status,
				// 	// 		stripe_price: subscription.
				// 	// 		stripe_id: `${subscription.id}`,
				// 	// 	},
				// 	// });
				// 	return new Response(
				// 		JSON.stringify({
				// 			success: true,
				// 			status: Status.HTTP_OK,
				// 			message: "Successfully Authorized.",
				// 			data: {
				// 				// subscription,
				// 				// sessions,
				// 				userId: user_id,
				// 				stripe_status: subscription.status,
				// 			},
				// 			subscription,
				// 		}),
				// 		{
				// 			status: Status.HTTP_OK,
				// 		}
				// 	);
				// }

				return new Response(
					JSON.stringify({
						success: true,
						status: Status.HTTP_OK,
						message: "Successfully Authorized.",
						data: {
							// subscription,
							sessions,
						},
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			} catch (err: any) {
				console.log("Stripe Error: ", err);
				return new Response(
					JSON.stringify({
						success: false,
						status: Status.HTTP_NOT_FOUND,
						message: `${Status.HTTP_MESSAGE_NOT_FOUND}.`,
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			}
		}
	} catch (error) {
		console.log("error", error);
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_NOT_FOUND,
				message: `${Status.HTTP_MESSAGE_NOT_FOUND}.`,
			}),
			{
				status: Status.HTTP_OK,
			}
		);
	}
}

export {
	MethodNotALlowed as GET,
	// POST as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
