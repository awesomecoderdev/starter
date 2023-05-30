import { HeroPattern } from "@/components/HeroPattern";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Guides } from "@/components/Guides";
import { Resource, Resources } from "@/components/Resources";
import { Metadata } from "next";
import { Properties, Property, Row, Col, Note } from "@/components/Note";
import { Prose } from "@/components/Prose";
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import { EnvelopeIcon } from "@/components/icons/EnvelopeIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";

export const metadata: Metadata = {
	title: `Getting Started - ${process.env.APP_NAME}`,
	description: "Getting Started",
};

export default async function Home() {
	await new Promise(function (resolve) {
		setTimeout(resolve, 5000);
	});
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
				<hr />
				<Heading level={2} tag="GET" label="/v1/groups" anchor={false}>
					List all groups
				</Heading>

				<Row>
					<Col>
						<Prose className="mt-4 border-t border-zinc-900/5 pt-10 dark:border-white/5">
							<Properties>
								<Property name="id" type="string">
									Unique identifier for the attachment.
								</Property>
								<Property name="message_id" type="string">
									Unique identifier for the message associated
									with the attachment.
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
									Timestamp of when the attachment was
									created.
								</Property>
							</Properties>
							<Properties>
								<Property name="id" type="string">
									Unique identifier for the attachment.
								</Property>
								<Property name="message_id" type="string">
									Unique identifier for the message associated
									with the attachment.
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
									Timestamp of when the attachment was
									created.
								</Property>
							</Properties>
							<Properties>
								<Property name="id" type="string">
									Unique identifier for the attachment.
								</Property>
								<Property name="message_id" type="string">
									Unique identifier for the message associated
									with the attachment.
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
									Timestamp of when the attachment was
									created.
								</Property>
							</Properties>
						</Prose>
					</Col>
					<Col sticky>
						<div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-2">
							{[
								{
									href: "/contacts",
									name: "Contacts",
									description:
										"Learn about the contact model and how to create, retrieve, update, delete, and list contacts.",
									icon: UserIcon,
									pattern: {
										y: 16,
										squares: [
											[0, 1],
											[1, 3],
										],
									},
								},
								{
									href: "/conversations",
									name: "Conversations",
									description:
										"Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.",
									icon: ChatBubbleIcon,
									pattern: {
										y: -6,
										squares: [
											[-1, 2],
											[1, 3],
										],
									},
								},
								{
									href: "/messages",
									name: "Messages",
									description:
										"Learn about the message model and how to create, retrieve, update, delete, and list messages.",
									icon: EnvelopeIcon,
									pattern: {
										y: 32,
										squares: [
											[0, 2],
											[1, 4],
										],
									},
								},
								{
									href: "/groups",
									name: "Groups",
									description:
										"Learn about the group model and how to create, retrieve, update, delete, and list groups.",
									icon: UsersIcon,
									pattern: {
										y: 22,
										squares: [[0, 1]],
									},
								},
							].map((resource) => (
								<Resource
									key={resource.href}
									resource={resource}
								/>
							))}
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}
