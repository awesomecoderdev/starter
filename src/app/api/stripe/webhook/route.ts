import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";
import { cookies, headers } from "next/headers";
import Stripe from "stripe";
import { Readable } from "node:stream";

const relevantEvents = new Set([
	"product.created",
	"product.updated",
	"price.created",
	"price.updated",
	"checkout.session.completed",
	"customer.subscription.created",
	"customer.subscription.updated",
	"customer.subscription.deleted",
]);

async function buffer(readable: Readable): Promise<Buffer> {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks);
}

export async function POST(request: NextApiRequest) {
	// const req = await request.json();
	const cookie = cookies();
	const header = headers();
	const sig = header.has("stripe-signature")
		? header.get("stripe-signature")
		: null;
	const buf = await buffer(request);
	const webhookSecret: string =
		process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
		process.env.STRIPE_WEBHOOK_SECRET ??
		"";
	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret) return;
		event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				message: `Webhook Error: ${err.message}`,
			}),
			{
				status: Status.HTTP_BAD_REQUEST,
			}
		);
	}

	// try {
	// 	// verify a token asymmetric
	// 	// if (!fs.existsSync("buf.txt")) {
	// 	fs.writeFileSync("buf.txt", JSON.stringify(req, null, 2));
	// 	// }
	// 	var secret = fs.readFileSync("buf.txt"); // get buf

	// 	return new Response(
	// 		JSON.stringify({
	// 			success: true,
	// 			status: Status.HTTP_OK,
	// 			data: {
	// 				req,
	// 				secret: JSON.parse(secret.toString()),
	// 				buf: buffer(secret),
	// 			},
	// 		}),
	// 		{
	// 			status: Status.HTTP_OK,
	// 		}
	// 	);
	// } catch (error: any) {
	// 	return new Response(
	// 		JSON.stringify({
	// 			success: false,
	// 			status: Status.HTTP_BAD_REQUEST,
	// 			error: error.message,
	// 		}),
	// 		{
	// 			status: Status.HTTP_BAD_REQUEST,
	// 		}
	// 	);
	// }

	// if (relevantEvents.has(event.type)) {
	// 	try {
	// 		switch (event.type) {
	// 			case "product.created":
	// 			case "product.updated":
	// 				// await upsertProductRecord(
	// 				// 	event.data.object as Stripe.Product
	// 				// );
	// 				break;
	// 			case "price.created":
	// 			case "price.updated":
	// 				// await upsertPriceRecord(event.data.object as Stripe.Price);
	// 				break;
	// 			case "customer.subscription.created":
	// 			case "customer.subscription.updated":
	// 			case "customer.subscription.deleted":
	// 				const subscription = event.data
	// 					.object as Stripe.Subscription;
	// 				// await manageSubscriptionStatusChange(
	// 				// 	subscription.id,
	// 				// 	subscription.customer as string,
	// 				// 	event.type === "customer.subscription.created"
	// 				// );
	// 				break;
	// 			case "checkout.session.completed":
	// 				const checkoutSession = event.data
	// 					.object as Stripe.Checkout.Session;
	// 				if (checkoutSession.mode === "subscription") {
	// 					const subscriptionId = checkoutSession.subscription;
	// 					// await manageSubscriptionStatusChange(
	// 					// 	subscriptionId as string,
	// 					// 	checkoutSession.customer as string,
	// 					// 	true
	// 					// );
	// 				}
	// 				break;
	// 			default:
	// 				throw new Error("Unhandled relevant event!");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		return new Response(
	// 			JSON.stringify({
	// 				success: false,
	// 				status: Status.HTTP_BAD_REQUEST,
	// 				message:
	// 					"Webhook error: Webhook handler failed. View logs.",
	// 			}),
	// 			{
	// 				status: Status.HTTP_BAD_REQUEST,
	// 			}
	// 		);
	// 	}
	// }

	// res.json({ received: true });
	// return new Response(
	// 	JSON.stringify({
	// 		success: true,
	// 		received: true,
	// 		status: Status.HTTP_OK,
	// 	}),
	// 	{
	// 		status: Status.HTTP_OK,
	// 	}
	// );

	return new Response(
		JSON.stringify({
			success: true,
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

const MethodOnlyAllowedPost = () => MethodNotALlowed({ Allow: "POST" });

export {
	MethodOnlyAllowedPost as GET,
	MethodOnlyAllowedPost as PUT,
	MethodOnlyAllowedPost as PATCH,
	MethodOnlyAllowedPost as DELETE,
	MethodOnlyAllowedPost as OPTIONS,
};

// stripe listen --forward-to http://localhost:3000/api/stripe/webhook/
