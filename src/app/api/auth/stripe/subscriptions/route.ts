import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import { getAppUrl, jwtSecret } from "@/utils/utils";
import { stripe } from "@/utils/stripe";
import { encode } from "@/utils/buffer";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		user: object;
	}
}

export const revalidate = 2;

export async function POST(request: Request) {
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const token = JwtToken?.value;

	try {
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

			if (!getUserEmail()) {
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

			const customer = await prisma.user.findUnique({
				where: {
					email: String(getUserEmail()),
				},
			});

			if (!customer) {
				console.log("No customer found");
				const expired = new Date(2000);
				return new Response(
					JSON.stringify({
						success: false,
						status: Status.HTTP_UNAUTHORIZED,
						message: "Session has been expired.///",
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

			try {
				// const session = await stripe.subscriptions.retrieve();

				const subscriptions = await prisma.subscription.findMany({
					where: {
						userId: `${customer.id}`,
					},
					include: {
						items: {
							orderBy: {
								created_at: "desc",
							},
							take: 1,
						},
					},
					orderBy: {
						created_at: "desc",
					},
					// take: 1,
				});

				return new Response(
					JSON.stringify({
						success: true,
						status: Status.HTTP_OK,
						message: "Successfully Authorized.",
						data: {
							subscriptions: subscriptions ?? [],
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
		} catch (error) {
			console.log("\n==================================\n");
			console.log("Error:", error);
			console.log("\n==================================\n");

			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_BAD_REQUEST,
					message: "Something went wrong.",
				}),
				{
					status: Status.HTTP_OK,
				}
			);
		}
	} catch (error: any) {
		console.log("\n==================================\n");
		console.log("Error:", error);
		console.log("\n==================================\n");

		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				message: "Something went wrong.",
			}),
			{
				status: Status.HTTP_OK,
			}
		);
	}
}

export {
	POST as GET,
	// MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
