import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Metadata } from "next";
import { Note, Properties, Property } from "@/components/Note";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
	title: `Quickstart - ${process.env.APP_NAME}`,
	description:
		"This guide will get you all set up and ready to use the Protocol API. We will cover how to get started an API client and how to make your first API request.",
};

export default function QuickStart() {
	return (
		<>
			<h1>Quickstart</h1>
			<p className="lead">
				This guide will get you all set up and ready to use the Protocol
				API. We will cover how to get started using one of our API
				clients and how to make your first API request. We will also
				look at where to go next to find all the information you need to
				take full advantage of our powerful REST API.
			</p>
			<Note>
				Before you can make requests to the Protocol API, you will need
				to grab your API key from your dashboard. You find it under
				<Link href="#">Settings &raquo; API</Link>.
			</Note>

			<Heading level="2" id="choose-your-client">
				Choose your client
			</Heading>

			<div className="not-prose">
				<Button href="/sdks" variant="text" arrow="right">
					Check out our list of first-party SDKs
				</Button>
			</div>

			<div className="my-16 xl:max-w-none">
				<Heading level={2} id="properties">
					Properties
				</Heading>
				<hr />
				<Heading level={2} tag="GET" label="/v1/groups" anchor={false}>
					List all groups
				</Heading>

				<Prose className="mt-4 border-t border-zinc-900/5 pt-10 dark:border-white/5">
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
				</Prose>
			</div>

			<Heading level="2" anchor={false}>
				Making your first API request
			</Heading>
			<p>
				After picking your preferred client, you are ready to make your
				first call to the Protocol API. Below, you can see how to send a
				GET request to the Conversations endpoint to get a list of all
				your conversations. In the cURL example, results are limited to
				ten conversations, the default page length for each client.
			</p>

			<div className="not-prose">
				<Button href="/conversations" variant="text" arrow="right">
					Read the docs for the Conversations endpoint
				</Button>
			</div>
			<Heading level="2" anchor={false}>
				Whats next?
			</Heading>
			<p>
				Great, you are now set up with an API client and have made your
				first request to the API. Here are a few links that might be
				handy as you venture further into the Protocol API:
			</p>

			<ul>
				<li>
					<Link href="#">
						Grab your API key from the Protocol dashboard
					</Link>
				</li>
				<li>
					<Link href="/conversations">
						Check out the Conversations endpoint
					</Link>
				</li>
				<li>
					<Link href="/errors">
						Learn about the different error messages in Protocol
					</Link>
				</li>
			</ul>
		</>
	);
}
