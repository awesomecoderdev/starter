import Status, { MethodNotALlowed } from "@/utils/http";
import { cookies } from "next/headers";
export async function GET(request: Request) {
	const cookie = cookies();

	return new Response(
		JSON.stringify({
			success: false,
			status: Status.HTTP_OK,
			data: {
				request,
				cookie,
			},
		}),
		{
			status: Status.HTTP_OK,
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
