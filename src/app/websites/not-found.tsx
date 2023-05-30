import { Code, CodeGroup } from "@/components/Code";
import { Prose } from "@/components/Prose";
import { PageNotFoundAnimation } from "@/components/animation/Lottie";
import { Metadata } from "next";
import React from "react";

export default function NotFound() {
	return (
		<Prose>
			<div className="flex items-center">
				<div className="w-72">
					<React.Fragment>
						<PageNotFoundAnimation />
					</React.Fragment>
				</div>
			</div>
		</Prose>
	);
}

export const metadata: Metadata = {
	title: `Not Found - ${process.env.APP_NAME}`,
	description: "Not Found",
};
