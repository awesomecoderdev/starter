import Status, { MethodNotALlowed } from "@/utils/http";
import { cookies } from "next/headers";

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

export async function POST(request: Request) {
	const cookie = cookies();

	const sig = req.headers["stripe-signature"];
	const webhookSecret =
		process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
		process.env.STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret) return;
		event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case "product.created":
				case "product.updated":
					await upsertProductRecord(
						event.data.object as Stripe.Product
					);
					break;
				case "price.created":
				case "price.updated":
					await upsertPriceRecord(event.data.object as Stripe.Price);
					break;
				case "customer.subscription.created":
				case "customer.subscription.updated":
				case "customer.subscription.deleted":
					const subscription = event.data
						.object as Stripe.Subscription;
					await manageSubscriptionStatusChange(
						subscription.id,
						subscription.customer as string,
						event.type === "customer.subscription.created"
					);
					break;
				case "checkout.session.completed":
					const checkoutSession = event.data
						.object as Stripe.Checkout.Session;
					if (checkoutSession.mode === "subscription") {
						const subscriptionId = checkoutSession.subscription;
						await manageSubscriptionStatusChange(
							subscriptionId as string,
							checkoutSession.customer as string,
							true
						);
					}
					break;
				default:
					throw new Error("Unhandled relevant event!");
			}
		} catch (error) {
			console.log(error);
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
					status: Status.HTTP_BAD_REQUEST,
				}
			);
			return res
				.status(400)
				.send('Webhook error: "Webhook handler failed. View logs."');
		}
	}

	// res.json({ received: true });

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
	MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
