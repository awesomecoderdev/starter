import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Subscriptions - ${process.env.APP_NAME}`,
	description: "Subscriptions",
};

export default async function Subscriptions() {
	await new Promise(function (resolve) {
		setTimeout(resolve, 15000);
	});
	return <div>subscriptions</div>;
}
