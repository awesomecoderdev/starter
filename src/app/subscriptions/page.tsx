import { Button } from "@/components/Button";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import axios from "@/utils/axios";
import { decode } from "@/utils/buffer";
import getStripe from "@/utils/stripe-client";
import { Fragment } from "react";
import { Code, CodeGroup } from "@/components/Code";
import { toast } from "sonner";

const getStripeSession = async (customer: string) => {
	try {
		// const req = await axios
		// 	.post(`/api/auth/stripe/billing/${customer}`)
		// 	.then((req) => {
		// 		console.log("data", req);
		// 		return req.data;
		// 	})
		// 	.catch((error) => []);
		// console.log("req", req);
		// return req;
		const req = await fetch(
			`http://localhost:3000/api/auth/stripe/billing/${customer}`,
			{
				method: "POST",
			}
		);
		// await new Promise(function (resolve) {
		// 	setTimeout(resolve, 15000);
		// });
		const res = await req.json();
		console.log("res", res);
		return res.data;
		// return `/api/auth/stripe/billing/${customer}`;
	} catch (error) {
		console.log("error", error);
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
	const session: any = await getStripeSession(customer);
	console.log("session", session);
	// searchParams.success && searchParams.secret && searchParams.session_id;

	return (
		<Fragment>
			<p className="lead">{JSON.stringify(customer)}</p>
			<CodeGroup>
				{session && (
					<Code
						code={JSON.stringify(session, null, 4)}
						language="json"
					>
						{JSON.stringify(session, null, 4)}
					</Code>
				)}
			</CodeGroup>
			<SubscriptionCard />
		</Fragment>
	);
}

// http://localhost:3000/subscriptions?success=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVpZCI6ImNsaXQycmptNzAwMDBoa3h2anR6aDYzdmwiLCJuYW1lIjoiVGFtZWthaCBNYWxvbmUiLCJlbWFpbCI6ImF3ZXNvbWVjb2Rlci5vcmdAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Zm1GRXdFS2NUb05hWTN1NV83bG5sQUZaQWRxQ19CbHg5dDhtRGxYZz1zOTYtYyIsInN0cmVldCI6IjQ4MyBHcmVlbiBMYW5lcyIsImNpdHkiOiJMb25kb24iLCJyZWdpb24iOiJMb25kb24iLCJ6aXAiOiJOMTMgNEJTIiwiY291bnRyeSI6IkdCIn0sImlhdCI6MTY4NjY5MjExOSwiZXhwIjoxNjg2NjkzMDE5fQ.FumhZ8adlDjGpgvcW63-DXqF60h7JmyiLKJlzlee5JI&session_id=cs_test_b1ZeEyqZYnn6hoh8aII53ou1B6bvNpUwDmsaO4nWCDiMcRsvJXYmU0Cqpj&secret=Y3VzX080anpUbW9KTWFaMzdtLmNsaXQycmptNzAwMDBoa3h2anR6aDYzdmw%3D
// http://localhost:3000/subscriptions?success=true&session_id=cs_test_b1OvtCqMZbJbHLNBsNgB8q3UB4l10lXofmNAItloHO3Vym6hDwlnljw9Cw&secret=Y3VzX080anpUbW9KTWFaMzdtLmNsaXQycmptNzAwMDBoa3h2anR6aDYzdmw%3D
