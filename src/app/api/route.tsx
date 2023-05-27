import sendMail from "@/emails";
import RecentLoginEmail from "@/emails/RecentLogIn";
import prisma from "@/prisma/client";
import Status, { MethodNotALlowed } from "@/utils/http";
import { cookies } from "next/headers";
import { headers } from "next/headers";

export async function GET(request: Request) {
	const cookie = cookies();
	const header = headers();

	// const req = await fetch("https://jsonplaceholder.typicode.com/posts");
	// const res = await req.json();

	// const posts = res.map((post: any) => {
	// 	return {
	// 		title: post.title,
	// 		slug: `${post.id}`,
	// 		content: post.body,
	// 	};
	// });

	// return new Response(
	// 	JSON.stringify({
	// 		success: true,
	// 		status: Status.HTTP_CREATED,
	// 		data: {
	// 			count: posts.length,
	// 			posts,
	// 		},
	// 	}),
	// 	{
	// 		status: Status.HTTP_CREATED,
	// 	}
	// );

	try {
		// const posts = await prisma.post.findMany({
		// 	select: {
		// 		id: true,
		// 		title: true,
		// 		author: {
		// 			select: {
		// 				name: true,
		// 			},
		// 		},
		// 	},
		// 	take: 10,
		// });

		sendMail({
			subject: "Welcome to stripe.",
			to: "ibrahim@gmail.com",
			component: <RecentLoginEmail />,
		});

		return new Response(
			JSON.stringify({
				success: true,
				status: Status.HTTP_CREATED,
				data: {
					request,
					headers: header.get("accept"),
				},
			}),
			{
				status: Status.HTTP_CREATED,
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				data: {
					error,
				},
			}),
			{
				status: Status.HTTP_BAD_REQUEST,
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
