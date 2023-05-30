import { Code, CodeGroup } from "@/components/Code";
import { Prose } from "@/components/Prose";
import { PageNotFoundAnimation } from "@/components/animation/Lottie";
import { Metadata } from "next";
import React from "react";

export default function NotFound() {
	return (
		<Prose>
			<div className="flex flex-col items-center justify-center rounded-md  py-12">
				<h1>Invalid Domain.</h1>
				{/* <CallWaiting className="pointer-events-none -my-8 w-96" /> */}
				<div className="w-screen max-w-xs">
					<PageNotFoundAnimation />
				</div>
			</div>
		</Prose>
	);
}

export const metadata: Metadata = {
	title: `Not Found - ${process.env.APP_NAME}`,
	description: "Not Found",
};
