import { Metadata } from "next";
import { constructMetadata } from "@/utils/utils";
import { Fragment } from "react";
import LogInCard from "@/components/auth/LogInCard";

type Props = {};

export const metadata: Metadata = constructMetadata({
	title: `Sign In - ${process.env.APP_NAME}`,
	description: "Sign In",
});

const Login = (props: Props) => {
	return (
		<Fragment>
			<LogInCard />
		</Fragment>
	);
};

export default Login;
