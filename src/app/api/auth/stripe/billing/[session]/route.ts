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

export async function GET(request: Request, context: ContextProps) {
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
					`${session_id}.`
				);

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
	// MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
