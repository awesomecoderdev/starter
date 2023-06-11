import jwt from "jsonwebtoken";
import { constructMetadata, jwtSecret } from "@/utils/utils";
import { cookies as getCookies } from "next/headers";
import { decode } from "@/utils/buffer";
import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import SignUpCard from "@/components/auth/SignUpCard";
import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
	title: `Sign Up - ${process.env.APP_NAME}`,
	description: "Sign Up",
};

type Props = {
	params?: any;
	searchParams?: any;
};

export default function SignUp(props: Props) {
	const cookies = getCookies();
	const { searchParams } = props;
	let Expired = false;
	let Authorized = null;
	let User = null;

	if (searchParams.token) {
		let tokenParams = searchParams?.token;
		let secretParams = searchParams?.secret;
		const signupSecret = decode(cookies.get("signup_secret")?.value);
		tokenParams = String(tokenParams).replace(signupSecret, "");

		const token: any = () => {
			try {
				const data = decode(tokenParams);
				let { token, exp } = jwt.verify(`${data}`, `${jwtSecret}`) as {
					token?: any;
					exp?: Date;
				};

				if (token) {
					try {
						let { user, exp } = jwt.verify(
							`${token}`,
							`${jwtSecret}`
						) as {
							user?: any;
							exp?: Date;
						};

						User = user;
					} catch (error) {
						// skip
					}
				}

				return token ? token : false;
			} catch (error) {
				return false;
			}
		};
		Authorized = token();
		Expired = secretParams != signupSecret || !token();
	}

	return (
		<Fragment>
			{searchParams.token ? (
				<SignUpCard
					signup={searchParams.token}
					expired={Expired}
					token={Authorized}
					user={User}
				/>
			) : (
				<SignUpCard />
			)}
		</Fragment>
	);
}
