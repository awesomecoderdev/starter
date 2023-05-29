import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Subscriptions - ${process.env.APP_NAME}`,
	description: "Subscriptions",
};

export default function Subscriptions() {
	return <div>subscriptions</div>;
}
