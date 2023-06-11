import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

import * as React from "react";

interface MagicRegisterProps {
	magicLink: string;
}

const baseUrl = "https://react-email-demo-ijnnx5hul-resend.vercel.app/";

export const MagicRegister = ({ magicLink }: MagicRegisterProps) => {
	let updatedDate = new Date("June 23, 2022 4:06:00 pm UTC");
	const formattedDate = new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "medium",
	}).format(updatedDate);

	const previewText = `Join There on Vercel`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/static/vercel-logo.png`}
								width="40"
								height="37"
								alt="Vercel"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Join <strong>afaf </strong> on{" "}
							<strong>Vercel</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hello there,
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							<strong>bukinoshita</strong> has invited you to the{" "}
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								pX={20}
								pY={12}
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
								href={magicLink}
							>
								Join the team
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							or copy and paste this URL into your browser:{" "}
							<Link
								href={magicLink}
								className="text-blue-600 no-underline"
							>
								{magicLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							This invitation was intended for .This invite was
							sent from located in If you were not expecting this
							invitation, you can ignore this email. If you are
							concerned about your account&apos;s safety, please
							reply to this email to get in touch with us.
							<br />
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default MagicRegister;
