import { Button } from "@/components/Button";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import axios from "@/utils/axios";
import { decode } from "@/utils/buffer";
import getStripe from "@/utils/stripe-client";
import { Fragment } from "react";
import { Code, CodeGroup } from "@/components/Code";
import { toast } from "sonner";
import { getAppUrl } from "@/utils/utils";

const getStripeSession = async (customer: string) => {
	try {
		const req = await fetch(
			`${getAppUrl()}api/auth/stripe/billing/${customer}`,
			{
				method: "POST",
			}
		);
		const res = await req.json();
		return res;
	} catch (error) {
		console.log("error", error);
		return {
			success: false,
			status: 404,
			message: `Error fetching session`,
		};
	}
};

type Props = {
	params?: any;
	searchParams?: any;
};

export default async function Subscriptions(props: Props) {
	const { searchParams } = props;
	const session_id = searchParams.session_id ?? null;
	let session: {
		success: boolean;
		status: number;
		message: string;
		data?: any;
	} = {
		success: false,
		status: 404,
		message: `Error fetching session.`,
	};

	if (session_id) {
		const secret = decode(searchParams.secret ?? "");
		const user = secret.replace(".", "&user_id=");
		const customer = `${session_id}?customer_id=${user}`;
		session = await getStripeSession(customer);
		console.log("Secret", secret);
	}

	console.log("session", session);

	return (
		<Fragment>
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
			{!session.success ? (
				<Fragment> Wrong</Fragment>
			) : (
				<Fragment>Valid</Fragment>
			)}
			<SubscriptionCard />
		</Fragment>
	);
}
