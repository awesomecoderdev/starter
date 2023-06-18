import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";
import prisma from "@/prisma/client";

export async function GET(request: Request) {
	try {
		// const sessions = await stripe.checkout.sessions.list({
		// 	customer: "cus_O4jzTmoJMaZ37m",
		// });

		const sessions = await prisma.user.findFirst({
			include: {
				subscriptions: {
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
					take: 1,
				},
			},
		});
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				message: `${Status.HTTP_MESSAGE_BAD_REQUEST}.`,
				sessions,
			}),
			{
				status: Status.HTTP_BAD_REQUEST,
			}
		);
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
	MethodNotALlowed as POST,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
