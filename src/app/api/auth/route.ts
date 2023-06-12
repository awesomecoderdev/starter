import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";

export async function GET(request: Request) {
	const cookieStore = cookies();
	const token = cookieStore.get("token");
	const user = await prisma.user.findFirst();

	try {
		// const customer = await stripe.customers.create({
		// 	name: "Hello World",
		// 	email: "hello@hello.com",
		// 	phone: "01720115642",
		// 	metadata: {
		// 		user: JSON.stringify(user),
		// 	},
		// });
		// const customer = await stripe.customers.list({
		// 	limit: 10,
		// });

		const products = await stripe.products.list({
			limit: 3,
		});

		return new Response(
			JSON.stringify({
				success: true,
				status: Status.HTTP_ACCEPTED,
				data: {
					products,
					// customer,
				},
			}),
			{
				status: Status.HTTP_ACCEPTED,
			}
		);
	} catch (error: any) {
		console.log("error", error);
		return new Response(
			JSON.stringify({
				success: true,
				status: Status.HTTP_BAD_REQUEST,
				error: error.mesage,
			}),
			{
				status: Status.HTTP_BAD_REQUEST,
				// headers: {
				// 	"Set-Cookie": `token=${btoa(JSON.stringify(posts))},count=${
				// 		posts.length
				// 	}`,
				// },
			}
		);
	}

	return new Response(
		JSON.stringify({
			success: true,
			status: Status.HTTP_ACCEPTED,
			data: {
				user,
			},
		}),
		{
			status: Status.HTTP_ACCEPTED,
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
