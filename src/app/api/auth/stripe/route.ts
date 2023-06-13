import Status, { MethodNotALlowed } from "@/utils/http";

export async function GET(request: Request) {
	return new Response(
		JSON.stringify({
			success: false,
			status: Status.HTTP_BAD_REQUEST,
			message: `${Status.HTTP_MESSAGE_BAD_REQUEST}.`,
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
