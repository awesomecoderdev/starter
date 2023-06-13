// "use client";

import { Button } from "@/components/Button";
import axios from "@/utils/axios";
import getStripe from "@/utils/stripe-client";
import { Fragment } from "react";
import { toast } from "sonner";

// api/auth/stripe/session
export default function Subscriptions() {
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
			<Button
				variant="filled"
				// onClick={progressCheckout}
			>
				Checkout
			</Button>
		</Fragment>
	);
}

// http://localhost:3000/subscriptions?success=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVpZCI6ImNsaXQycmptNzAwMDBoa3h2anR6aDYzdmwiLCJuYW1lIjoiVGFtZWthaCBNYWxvbmUiLCJlbWFpbCI6ImF3ZXNvbWVjb2Rlci5vcmdAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Zm1GRXdFS2NUb05hWTN1NV83bG5sQUZaQWRxQ19CbHg5dDhtRGxYZz1zOTYtYyIsInN0cmVldCI6IjQ4MyBHcmVlbiBMYW5lcyIsImNpdHkiOiJMb25kb24iLCJyZWdpb24iOiJMb25kb24iLCJ6aXAiOiJOMTMgNEJTIiwiY291bnRyeSI6IkdCIn0sImlhdCI6MTY4NjY5MjExOSwiZXhwIjoxNjg2NjkzMDE5fQ.FumhZ8adlDjGpgvcW63-DXqF60h7JmyiLKJlzlee5JI&session_id=cs_test_b1ZeEyqZYnn6hoh8aII53ou1B6bvNpUwDmsaO4nWCDiMcRsvJXYmU0Cqpj&secret=Y3VzX080anpUbW9KTWFaMzdtLmNsaXQycmptNzAwMDBoa3h2anR6aDYzdmw%3D
