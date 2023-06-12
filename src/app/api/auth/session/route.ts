import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import { jwtSecret } from "@/utils/utils";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		user: object;
	}
}

// export const runtime = "edge";
export const revalidate = 2;

export async function POST(request: Request) {
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;
	// const user = await prisma.user.findFirst();
	// var secret = fs.readFileSync("public.pem"); // get public key
	const token = JwtToken?.value;

	try {
		// const user = await prisma.user.findFirst();

		// const token = jwt.sign(
		// 	{
		// 		user: {
		// 			uid: user?.id,
		// 			name: user?.name,
		// 			email: user?.email,
		// 			avatar: user?.avatar,
		// 		},
		// 	},
		// 	secret,
		// 	{
		// 		expiresIn: 60 * timeout,
		// 		// expiresIn: 10,
		// 	}
		// );

		const getUserEmail = () => {
			try {
				let { user, exp } = (<jwt.JwtPayload>(
					jwt.verify(`${token}`, `${jwtSecret}`)
				)) as { user?: any; exp?: any };

				if (user) {
					return user?.email;
				}
			} catch (error) {
				// skip
			}
			return null;
		};

		if (!getUserEmail) {
			const expired = new Date(2000);
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_UNAUTHORIZED,
					message: "Session has been expired.",
					reload: true,
				}),
				{
					status: Status.HTTP_OK,
					headers: {
						"Set-Cookie": `token=deleted; Path=/; Expires=${expired};`,
					},
				}
			);
		}

		const authorization = await prisma.user.findUnique({
			where: {
				email: getUserEmail(),
			},
		});

		if (authorization) {
			const jwtToken = jwt.sign(
				{
					user: {
						uid: authorization.id,
						name: authorization?.name,
						email: authorization?.email,
						avatar: authorization?.avatar,
						street: authorization?.street,
						city: authorization?.city,
						region: authorization?.region,
						zip: authorization?.zip,
						country: authorization?.country,
					},
				},
				jwtSecret,
				{
					expiresIn: 60 * timeout,
					// expiresIn: 10,
				}
			);
			return new Response(
				JSON.stringify({
					success: true,
					status: Status.HTTP_OK,
					message: "Successfully Authorized.",
				}),
				{
					status: Status.HTTP_OK,
					headers: {
						"Set-Cookie": `token=${jwtToken}; Path=/;`,
						// "Set-Cookie": `token=${token}; Expires=${expired}  Secure; Path=/; Domain=localhost`,
						// "Set-Cookie": `token=${token}; Expires=${expired}; Path=/;`,
					},
				}
			);
		} else {
			throw new Error(`${Status.HTTP_MESSAGE_UNAUTHORIZED}`);
		}
	} catch (error) {
		const expired = new Date(2000);
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_UNAUTHORIZED,
				message: "Session has been expired.",
				reload: true,
			}),
			{
				status: Status.HTTP_OK,
				headers: {
					"Set-Cookie": `token=deleted; Path=/; Expires=${expired};`,
				},
			}
		);
	}
}

export {
	MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
