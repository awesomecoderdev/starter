import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";
import prisma from "@/prisma/client";

const plansData = [
	{
		name: "Enterprise",
		stripe_price: "price_1NIdLOIX4CRni5u3Ll19wEya",
		price: 249,
		type: "monthly",
		websites: 10,
		posts: 150,
		metadata: null,
	},
	{
		name: "Business",
		stripe_price: "price_1NIdKtIX4CRni5u30WEc2c8I",
		price: 99,
		type: "monthly",
		websites: 5,
		posts: 100,
		metadata: null,
	},
	{
		name: "Startup",
		stripe_price: "price_1NIdKDIX4CRni5u33vxRuoO7",
		price: 29,
		type: "monthly",
		websites: 1,
		posts: 50,
		metadata: null,
	},

	{
		name: "Startup Yearly",
		stripe_price: "price_1NMVNEIX4CRni5u3Eg559Yvg",
		price: 319,
		type: "yearly",
		websites: 1,
		posts: 50,
		metadata: null,
	},

	{
		name: "Business Yearly",
		stripe_price: "price_1NMVP2IX4CRni5u3vfsZBacT",
		price: 999,
		type: "yearly",
		websites: 5,
		posts: 100,
		metadata: null,
	},

	{
		name: "Enterprise Yearly",
		stripe_price: "price_1NMVQWIX4CRni5u3nn2SLHB4",
		price: 2499,
		type: "yearly",
		websites: 10,
		posts: 150,
		metadata: null,
	},
];

export async function GET(request: Request) {
	try {
		// const sessions = await stripe.products.list({
		// 	limit: 7,
		// });

		// const sessions = await prisma.plan.findMany({
		// 	// where: {},
		// 	orderBy: {
		// 		created_at: "desc",
		// 	},
		// 	// take: 1,
		// });
		// const create = await prisma.plan.createMany({
		// 	data: plansData,
		// });

		const users = await prisma.user.findMany({
			take: 500,
		});
		const plans = await prisma.plan.findMany({
			take: 500,
		});

		// const plans = await prisma.plan.deleteMany({
		// 	where: {
		// 		metadata: null,
		// 	},
		// });

		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_OK,
				message: `${Status.HTTP_MESSAGE_OK}.`,
				// sessions,
				data: {
					users,
					plans,
				},
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
