import fs from "fs";
import Status, { MethodNotALlowed } from "@/utils/http";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Readable } from "node:stream";

// export const config = {
// 	runtime: "edge", // for Edge API Routes only
// 	// unstable_allowDynamic: [
// 	// 	// allows a single file
// 	// 	"/lib/utilities.js",
// 	// 	// use a glob to allow anything in the function-bind 3rd party module
// 	// 	"/node_modules/function-bind/**",
// 	// ],
// 	api: {
// 		bodyParser: false,
// 	},
// };

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

const webhookSecret: any =
	process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;

// async function buffer(readable: Readable): Promise<Buffer> {
// 	const chunks = [];
// 	for await (const chunk of readable) {
// 		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
// 	}
// 	return Buffer.concat(chunks);
// }

export async function POST(request: Request) {
	const req = await request.json();
	const header = headers();
	const sig = header.get("stripe-signature") ?? null;
	const buf: string = JSON.stringify(req);
	let event: Stripe.Event;

	// if (!fs.existsSync("buf.txt")) {
	// fs.writeFileSync(
	// 	"buf.txt",
	// 	JSON.stringify(
	// 		[
	// 			{
	// 				req,
	// 				header,
	// 			},
	// 		],
	// 		null,
	// 		2
	// 	)
	// );
	// }

	try {
		if (!sig || !webhookSecret) {
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_BAD_REQUEST,
					message: `Webhook Error: Invalid Signature.`,
				}),
				{
					status: Status.HTTP_BAD_REQUEST,
				}
			);
		}
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

	try {
		if (relevantEvents.has(event.type)) {
			try {
				switch (event.type) {
					case "product.created":
					case "product.updated":
						// await upsertProductRecord(
						// 	event.data.object as Stripe.Product
						// );
						console.log(`✅ Event message: Product Event.`);
						break;
					case "price.created":
					case "price.updated":
						// await upsertPriceRecord(event.data.object as Stripe.Price);
						console.log(`✅ Event message: Price Event.`);
						break;
					case "customer.subscription.created":
					case "customer.subscription.updated":
					case "customer.subscription.deleted":
						const subscription = event.data
							.object as Stripe.Subscription;
						// await manageSubscriptionStatusChange(
						// 	subscription.id,
						// 	subscription.customer as string,
						// 	event.type === "customer.subscription.created"
						// );
						console.log(`✅ Event message: Subscription Event.`);

						break;
					case "checkout.session.completed":
						const checkoutSession = event.data
							.object as Stripe.Checkout.Session;
						if (checkoutSession.mode === "subscription") {
							const subscriptionId = checkoutSession.subscription;
							// await manageSubscriptionStatusChange(
							// 	subscriptionId as string,
							// 	checkoutSession.customer as string,
							// 	true
							// );
							console.log(
								`✅ Event message: Payment completed Event.`
							);
						}
						break;
					default:
						throw new Error("Unhandled relevant event!");
				}
			} catch (err: any) {
				console.log(`❌ Error message: ${err.message}`);
				return new Response(
					JSON.stringify({
						success: false,
						status: Status.HTTP_BAD_REQUEST,
						message: "Webhook error: Webhook handler failed.",
					}),
					{
						status: Status.HTTP_BAD_REQUEST,
					}
				);
			}
		}
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				message: "Webhook error: Webhook handler failed.",
			}),
			{
				status: Status.HTTP_BAD_REQUEST,
			}
		);
	}

	// # final response
	return new Response(
		JSON.stringify({
			success: true,
			received: true,
			status: Status.HTTP_OK,
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
