import { cookies as getCookies } from "next/headers";
import { getUserFromCookie } from "@/utils/buffer";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import { HeroPattern } from "@/components/HeroPattern";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Code, CodeGroup } from "@/components/Code";

export const metadata: Metadata = {
	title: `Dashboard - ${process.env.APP_NAME}`,
	description: "Dashboard",
};

export default async function Dashboard() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const session = getUserFromCookie(token);
	await new Promise(function (resolve) {
		setTimeout(resolve, 5000);
	});

	if (!session?.email) {
		// redirect("/login");
	}

	return (
		<>
			<HeroPattern />
			<h1>Dashboard</h1>
			<p className="lead">
				Use the Protocol API to access contacts, conversations, group
				messages, and more and seamlessly integrate your product into
				the workflows of dozens of devoted Protocol users.{" "}
			</p>
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

			<div className="not-prose mb-16 mt-6 flex gap-3">
				<Button href="/quickstart" arrow="right">
					Quickstart
				</Button>
				<Button href="/sdks" variant="outline">
					Explore SDKs
				</Button>
			</div>
			<Heading level="2" anchor={false}>
				Getting started
			</Heading>
			<p className="lead">
				To get started, create a new application in your
				<Link href="#">developer settings</Link>, then read about how to
				make requests for the resources you need to access using our
				HTTP APIs or dedicated client SDKs. When your integration is
				ready to go live, publish it to our
				<Link href="#">integrations directory</Link> to reach the
				Protocol community.
			</p>
			<div className="not-prose">
				<Button href="/sdks" variant="text" arrow="right">
					Get your API key
				</Button>
			</div>
		</>
	);
}
