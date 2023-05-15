import prisma from "@/prisma/client";
import Status, { MethodNotALlowed } from "@/utils/http";
import { cookies } from "next/headers";

interface Data {
	name: String;
}

export async function GET(request: Request) {
	const cookie = cookies();

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
		const posts = await prisma.post.findMany({
			select: {
				id: true,
				title: true,
				author: {
					select: {
						name: true,
					},
				},
			},
			take: 10,
		});

		return new Response(
			JSON.stringify({
				success: true,
				status: Status.HTTP_CREATED,
				data: {
					count: posts.length,
					posts,
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
