import Image from "next/image";
import { HeroPattern } from "@/components/HeroPattern";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Guides } from "@/components/Guides";
import { Resources } from "@/components/Resources";
import { Metadata } from "next";

export default function Home() {
	return (
		<>
			<HeroPattern />
			<h1>API Documentation</h1>
			<p className="lead">
				Use the Protocol API to access contacts, conversations, group
				messages, and more and seamlessly integrate your product into
				the workflows of dozens of devoted Protocol users.{" "}
			</p>

			<div className="not-prose mb-16 mt-6 flex gap-3">
				<Button
					href="/quickstart"
					arrow="right"
					children="Quickstart"
				/>
				<Button
					href="/sdks"
					variant="outline"
					children="Explore SDKs"
				/>
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
				<Button
					href="/sdks"
					variant="text"
					arrow="right"
					children="Get your API key"
				/>
			</div>

			<Guides />
			<Resources />
		</>
	);
}

export const metadata: Metadata = {
	title: "Tailwind Protocol",
	description:
		"Learn everything there is to know about the Protocol API and integrate Protocol into your product.",
};

export const sections = [
	{ title: "Guides", id: "guides" },
	{ title: "Resources", id: "resources" },
];
