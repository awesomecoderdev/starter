import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import SignUpCard from "@/components/auth/SignUpCard";
import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
	title: `Sign Up - ${process.env.APP_NAME}`,
	description: "Sign Up",
};

export default function SignUp() {
	return (
		<Fragment>
			<SignUpCard />
		</Fragment>
	);
}
