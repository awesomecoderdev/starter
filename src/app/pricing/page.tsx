import PricingContent from "@/components/pricing/PricingContent";
import { getAppUrl } from "@/utils/utils";
import React, { Fragment } from "react";
import { Code, CodeGroup } from "@/components/Code";
import { constructMetadata } from "@/utils/utils";
import { Metadata } from "next";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = constructMetadata({
	title: `Pricing - ${process.env.APP_NAME}`,
	description: "Pricing",
});

const getSubscriptions = async () => {
	try {
		const req = await fetch(`${getAppUrl()}api/subscriptions`, {
			method: "POST",
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log("error", error);
		return {
			success: false,
			status: 404,
			message: `Error fetching session.`,
		};
	}
};

const Pricing = async () => {
	const subscriptions = await getSubscriptions();
	return (
		<Fragment>
			{/* {subscriptions.map((subscription) => (
				<PricingContent subscription={subscription} />
			))} */}
			{/* <CodeGroup>
				{subscriptions && (
					<Code
						title="Subscription"
						code={JSON.stringify(subscriptions, null, 4)}
						language="json"
					>
						{JSON.stringify(subscriptions, null, 4)}
					</Code>
				)}
			</CodeGroup> */}
			<Prose enable={false}>
				<PricingContent />
			</Prose>
		</Fragment>
	);
};

export default Pricing;
