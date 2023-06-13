import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";

export async function GET(request: Request) {
	const sessions = await stripe.checkout.sessions.list({
		customer: "cus_O4jzTmoJMaZ37m",
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
}

export {
	MethodNotALlowed as POST,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
