import { HeroPattern } from "@/components/HeroPattern";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Guides } from "@/components/Guides";
import { Resources } from "@/components/Resources";
import { Metadata } from "next";
import { Properties, Property } from "@/components/Note";

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

			<Guides />
			<Resources />

			<div className="my-16 xl:max-w-none">
				<Heading level={2} id="properties">
					Properties
				</Heading>
				<div className="not-prose mt-4 border-t border-zinc-900/5 pt-10 dark:border-white/5">
					<Properties>
						<Property name="id" type="string">
							Unique identifier for the attachment.
						</Property>
						<Property name="message_id" type="string">
							Unique identifier for the message associated with
							the attachment.
						</Property>
						<Property name="filename" type="string">
							The filename for the attachment.
						</Property>
						<Property name="file_url" type="string">
							The URL for the attached file.
						</Property>
						<Property name="file_type" type="string">
							The MIME type of the attached file.
						</Property>
						<Property name="file_size" type="integer">
							The file size of the attachment in bytes.
						</Property>
						<Property name="created_at" type="timestamp">
							Timestamp of when the attachment was created.
						</Property>
					</Properties>
				</div>
			</div>
		</>
	);
}

export const metadata: Metadata = {
	title: "Tailwind Protocol",
	description:
		"Learn everything there is to know about the Protocol API and integrate Protocol into your product.",
};
