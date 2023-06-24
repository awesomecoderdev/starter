import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
	try {
		const subscriptions = await prisma.plan.findMany({
			orderBy: {
				created_at: "desc",
			},
			// take: 1,
		});
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_OK,
				message: `${Status.HTTP_MESSAGE_OK}.`,
				data: {
					subscriptions: subscriptions ?? [],
				},
			}),
			{
				status: Status.HTTP_OK,
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
	MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
