"use client";

import { Button } from "@/components/Button";
import axios from "@/utils/axios";
import { decode } from "@/utils/buffer";
import getStripe from "@/utils/stripe-client";
import { Fragment } from "react";
import { toast } from "sonner";

export default function SubscriptionCard() {
	const progressCheckout = () => {
		axios
			.post("/api/auth/stripe/session", {
				price: "price_1NIdKDIX4CRni5u33vxRuoO7",
				quantity: 1,
				metadata: {
					ibrahim: true,
				},
			})
			.then(async (req) => {
				const res = req.data;
				console.log("res", res);

				if (res.success) {
					toast.success(res?.message);

					const stripe = await getStripe();
					stripe?.redirectToCheckout({
						sessionId: res.data.sessionId,
					});
				} else {
					toast.error(res?.message);
				}
			})
			.catch((error) => {
				console.log("error", error);
				toast.error(error.message);
				// if (error.response.status != 422) throw new Error(error);
			});
	};

	return (
		<Fragment>
			<p className="lead">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Dolorem, laboriosam ipsum odio consequuntur ab odit optio
				pariatur cupiditate ipsa quidem minima architecto nobis
				similique obcaecati ducimus libero corporis veniam voluptatum?
			</p>
			<Button variant="filled" onClick={progressCheckout}>
				Checkout
			</Button>
		</Fragment>
	);
}
