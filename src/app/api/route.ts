import { MethodNotALlowed } from "@/lib/http";
import prisma from "@/prisma/client";
import Status from "@/utils/http";
import { cookies } from "next/headers";

interface Data {
	name: String;
}

export async function GET(request: Request) {
	// const query = request?.nextUrl?.searchParams;
	const cookieStore = cookies();
	const token = cookieStore.get("token");

	// console.log({ slug, params, query, token: token?.value });
	// const req = await fetch("https://jsonplaceholder.typicode.com/posts");
	// const res = await req.json();

	// const posts = res.map((post: any) => {
	// 	return {
	// 		title: post.title,
	// 		slug: `${post.id}`,
	// 		content: post.body,
	// 	};
	// });

	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Md. Ibrahim Kholil",
	// 		email: "awesomecoder.dev@gmail.com",
	// 		password: "password",
	// 		posts: {
	// 			create: posts,
	// 		},
	// 	},
	// });
	// console.log("user", user);
	// const user = await prisma.user.findFirst();

	// const posts = await prisma.post.create({
	// 	data: {
	// 		title: "Hello World",
	// 		authorId: user.id,
	// 	},
	// });

	const posts = await prisma.post.findMany({
		// where: {
		// 	id: {
		// 		in: [1, 2],
		// 	},
		// },
		select: {
			id: true,
			title: true,
			author: {
				select: {
					name: true,
				},
			},
		},
		// include: {
		// 	author: true,
		// },
		// cursor: { id: 5 },
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
			// headers: {
			// 	"Set-Cookie": `token=${btoa(JSON.stringify(posts))},count=${
			// 		posts.length
			// 	}`,
			// },
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
