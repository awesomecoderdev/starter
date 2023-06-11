import { Metadata } from "next";
import jwt from "jsonwebtoken";
import { constructMetadata, jwtSecret } from "@/utils/utils";
import { cookies as getCookies } from "next/headers";
import { Fragment } from "react";
import LogInCard from "@/components/auth/LogInCard";
import { decode } from "@/utils/buffer";

type Props = {
	params?: any;
	searchParams?: any;
};

export const metadata: Metadata = constructMetadata({
	title: `Sign In - ${process.env.APP_NAME}`,
	description: "Sign In",
});

const Login = (props: Props) => {
	const cookies = getCookies();
	const { searchParams } = props;
	let Expired = false;
	let Authorized = null;

	if (searchParams.token) {
		let tokenParams = searchParams?.token;
		let secretParams = searchParams?.secret;
		const loginSecret = decode(cookies.get("login_secret")?.value);
		tokenParams = String(tokenParams).replace(loginSecret, "");

		const token: any = () => {
			try {
				const data = decode(tokenParams);
				let { token, exp } = jwt.verify(`${data}`, `${jwtSecret}`) as {
					token?: any;
					exp?: Date;
				};
				return token ? token : false;
			} catch (error) {
				return false;
			}
		};
		Authorized = token();

		Expired = secretParams != loginSecret || !token();
	}

	return (
		<Fragment>
			{searchParams.token ? (
				<LogInCard
					login={searchParams.token}
					expired={Expired}
					token={Authorized}
				/>
			) : (
				<LogInCard />
			)}
		</Fragment>
	);
};

export default Login;
