import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { Metadata } from "next";
import { Note, Properties, Property } from "@/components/Note";
import { Prose } from "@/components/Prose";
import { Code, CodeGroup, Pre } from "@/components/Code";
import { Tag } from "@/components/Tag";
import { BADHINTS } from "dns";

export const metadata: Metadata = {
	// title: `Quickstart - ${process.env.APP_NAME}`,
	title: `Quickstart`,
	description:
		"This guide will get you all set up and ready to use the Protocol API. We will cover how to get started an API client and how to make your first API request.",
};
function countSpacesFromLeft(str: string) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === " ") {
			count++;
		} else {
			break;
		}
	}
	return count;
}

export default function QuickStart() {
	const code = `# cURL is most likely already installed on your machine
import ApiClient from '@example/protocol-api'

const client = new ApiClient(token)

await client.contacts.create({
  username: 'FrankMcCallister',
  phone_number: '1-800-759-3000',
  avatar_url: 'https://assets.protocol.chat/avatars/frank.jpg',
})

import ApiClient from '@example/protocol-api'

const client = new ApiClient(token)

await client.messages.list()

	`;
	const python = `<section class="introduce" id="skills">
	<div class="skill__container" data-sr-id="4" style="visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -30, 0, 1);">
	<div class="skill__header">
	   <h1 class="sikll__title">Skills</h1>
	   <div class="skill__border"></div>
	</div>
	<div class="skill__grid">
	   <div class="skill__names" data-sr-id="5" style="visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -30, 0, 1);">
		  <h1 class="sill__name_title">I have experience in </h1>
		  <div class="my__skills">
			 <ul class="my__skills_list">
				<li class="my__skills_item">Html5, Css3, Scss</li>
				<li class="my__skills_item">Bootstrap, Tailwindcss</li>
				<li class="my__skills_item">Javascript, jQuery, AJAX</li>
				<li class="my__skills_item">PHP,PHP[OOP], REST API, LARAVEL</li>
				<li class="my__skills_item">MYSQL, JSON DB</li>
				<li class="my__skills_item">PSD to Html5, PSD to WordPress/WooCommerce</li>
				<li class="my__skills_item">WordPress ( Theme Development, Plugin Development) </li>
			 </ul>
		  </div>
	   </div>
	   <div class="skill__perc" data-sr-id="6" style="visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -30, 0, 1);">
		  <div class="sill__lists">
			 <div class="skill__item">
				<h6 class="skillbar__title"><i class="bx bxl-html5"></i></h6>
				<div class="skillbar" data-percent="95%">
				   <div class="skillbar-bar html5" style="width: 95%;">
				   </div>
				</div>
				<h6 class="skillbar__percent"><span class="count">95</span>%</h6>
			 </div>
			 <div class="skill__item">
				<h6 class="skillbar__title"><i class="bx bxl-nodejs"></i></h6>
				<div class="skillbar" data-percent="70%">
				   <div class="skillbar-bar js" style="width: 70%;">
				   </div>
				</div>
				<h6 class="skillbar__percent"><span class="count">70</span>%</h6>
			 </div>
			 <div class="skill__item">
				<h6 class="skillbar__title"><i class="bx bxl-php"></i></h6>
				<div class="skillbar" data-percent="85%">
				   <div class="skillbar-bar php" style="width: 85%;">
				   </div>
				</div>
				<h6 class="skillbar__percent"><span class="count">85</span>%</h6>
			 </div>
			 <div class="skill__item">
				<h6 class="skillbar__title"><i class="bx bxl-wordpress"></i></h6>
				<div class="skillbar" data-percent="90%">
				   <div class="skillbar-bar wordpress" style="width: 90%;">
				   </div>
				</div>
				<h6 class="skillbar__percent "><span class="count">90</span>%</h6>
			 </div>
		  </div>
	   </div>
	</div>
 </div>
</section>
	`;
	const bash = `
curl -G https://api.protocol.chat/v1/messages \
-H "Authorization: Bearer {token}" \
-d conversation_id=xgQQXg3hrtjh7AvZ \
-d limit=10
`;

	const json = `{
		"has_more": false,
		"data": [
		  {
			"id": "SIuAFUNKdSYHZF2w",
			"conversation_id": "xgQQXg3hrtjh7AvZ",
			"contact": {
			  "id": "WAz8eIbvDR60rouK",
			  "username": "KevinMcCallister",
			  "phone_number": "1-800-759-3000",
			  "avatar_url": "https://assets.protocol.chat/avatars/buzzboy.jpg",
			  "last_active_at": 705103200,
			  "created_at": 692233200
			},
			"message": "It’s a nice night for a neck injury.",
			"reactions": [],
			"attachments": [],
			"read_at": 705103200,
			"created_at": 692233200,
			"updated_at": 692233200
		  },
		  {
			"id": "hSIhXBhNe8X1d8Et",
			// ..
		  }
		]
	  }

`;
	return (
		<>
			<h1>Quickstart</h1>

			<CodeGroup tag="POST" label="/v1/update">
				<Code language="js" code={code}>
					{code}
				</Code>
				<Code language="html" code={python}>
					{python}
				</Code>
				<Code code={bash}>{bash}</Code>
				<Code code={json} language="json">
					{json}
				</Code>
			</CodeGroup>

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
