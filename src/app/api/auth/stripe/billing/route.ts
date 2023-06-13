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

export async function POST(request: Request) {
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const token = JwtToken?.value;

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
				const sessions = await stripe.checkout.sessions.list({
					customer: customer.stripeId,
				});

				return new Response(
					JSON.stringify({
						success: true,
						status: Status.HTTP_OK,
						message: "Successfully Authorized.",
						data: {
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
						status: Status.HTTP_INTERNAL_SERVER_ERROR,
						message: "Something went wrong.",
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			}
		} else {
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
				headers: {
					"Set-Cookie": `token=deleted; Path=/; Expires=${expired};`,
				},
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
