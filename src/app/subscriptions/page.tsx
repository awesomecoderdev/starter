// "use client";

import { Button } from "@/components/Button";
import axios from "@/utils/axios";
import { decode } from "@/utils/buffer";
import getStripe from "@/utils/stripe-client";
import { Fragment } from "react";
import { toast } from "sonner";

const getStripeSession = async (customer: string) => {
	try {
		// const req = await axios
		// 	.post(`/api/auth/stripe/billing/${customer}`)
		// 	.then((req) => {
		// 		console.log("data", req);
		// 		return req.data;
		// 	})
		// 	.catch((error) => ({ success: false }));
		// console.log("req", req);
		// return req;
		return `/api/auth/stripe/billing/${customer}`;
	} catch (error) {
		return [];
	}
};

type Props = {
	params?: any;
	searchParams?: any;
};

export default async function Subscriptions(props: Props) {
	const { searchParams } = props;
	const session_id = searchParams.session_id ?? null;
	const secret = decode(searchParams.secret ?? "");
	const user = secret.replace(".", "&user_id=");
	const customer = `${session_id}?customer_id=${user}`;
	const session = await getStripeSession(customer);

	// searchParams.success && searchParams.secret && searchParams.session_id;

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
			<p className="lead">{JSON.stringify(session, null, 4)}</p>
			<p>
				api/auth/stripe/billing/cs_test_b1ZeEyqZYnn6hoh8aII53ou1B6bvNpUwDmsaO4nWCDiMcRsvJXYmU0Cqpj?customer_id=cus_O4jzTmoJMaZ37m&user_id=clit2rjm70000hkxvjtzh63vl
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
