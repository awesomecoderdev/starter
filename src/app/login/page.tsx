import { Metadata } from "next";
import { constructMetadata } from "@/utils/utils";
import { Fragment } from "react";
import SignInCard from "@/components/auth/SignInCard";

type Props = {};

export const metadata: Metadata = constructMetadata({
	title: `Login - ${process.env.APP_NAME}`,
	description: "Login",
});

const Login = (props: Props) => {
	return (
		<Fragment>
			<SignInCard />
		</Fragment>
	);
};

export default Login;
