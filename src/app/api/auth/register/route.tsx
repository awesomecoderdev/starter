import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import sendMail from "@/emails";
import WelComeEmail from "@/emails/Welcome";
import { getAppUrl, jwtSecret, nanoid } from "@/utils/utils";
import { encode } from "@/utils/buffer";
import MagicRegister from "@/emails/MagicRegister";

export async function POST(request: Request) {
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;
	const req = await request.json();
	const {
		uid,
		email,
		displayName,
		photoURL,
		apiKey,
		name,
		street,
		city,
		region,
		zip,
		country,
		secret,
	} = req;

	let user: any = null;
	try {
		if (!email) {
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_NOT_FOUND,
					message: "Email address can't be empty.",
				}),
				{
					status: Status.HTTP_OK,
				}
			);
		} else {
			try {
				const findUser = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});

				if (findUser) {
					return new Response(
						JSON.stringify({
							success: false,
							status: Status.HTTP_NOT_FOUND,
							message:
								"An account is already registered with your email address Please log in.",
						}),
						{
							status: Status.HTTP_OK,
						}
					);
				}
			} catch (error: any) {
				console.log("Error: ", error);
				throw new Error(error);
			}

			if (street && email) {
				try {
					const getUserEmail = () => {
						let { user, exp } = jwt.verify(
							`${secret}`,
							`${jwtSecret}`
						) as { user?: any; exp?: any };
						return user ? user.email : null;
					};

					if (email != getUserEmail()) {
						console.log("Invalid Token");
						return new Response(
							JSON.stringify({
								success: false,
								status: Status.HTTP_OK,
								message: "Something went wrong.",
							}),
							{
								status: Status.HTTP_OK,
							}
						);
					}

					const user: any = await prisma.user.create({
						data: {
							email: email,
							name: name,
							zip: zip,
							street: street,
							city: city,
							country: country,
							region: region,
						},
					});

					const token = jwt.sign(
						{
							user: {
								uid: user.id,
								name: user.name,
								email: user.email,
								avatar: user.avatar,
								publicId: user.publicId,
								street: user.street,
								city: user.city,
								region: user.region,
								zip: user.zip,
								country: user.country,
							},
						},
						jwtSecret,
						{
							expiresIn: 60 * timeout,
						}
					);

					return new Response(
						JSON.stringify({
							success: true,
							status: Status.HTTP_CREATED,
							message:
								"You account has been successfully updated.",
						}),
						{
							status: Status.HTTP_CREATED,
							headers: {
								"Set-Cookie": `token=${token}; Path=/;`,
							},
						}
					);
				} catch (error) {
					console.log("Creating Error:", error);
					return new Response(
						JSON.stringify({
							success: false,
							status: Status.HTTP_OK,
							message: "Something went wrong.",
						}),
						{
							status: Status.HTTP_OK,
						}
					);
				}
			}

			if (email && !uid && !displayName) {
				try {
					const loginSecret = nanoid();
					const token = jwt.sign(
						{
							user: {
								uid: loginSecret,
								email: email,
								name: null,
								avatar: null,
								secret: null,
							},
						},
						jwtSecret,
						{
							expiresIn: 60 * timeout,
						}
					);
					const loginToken = jwt.sign({ token: token }, jwtSecret, {
						expiresIn: 60 * 15,
					});
					const verificationToken = encode(loginToken);
					const magicLink = getAppUrl(
						`signup/?token=${loginSecret}${verificationToken}&secret=${loginSecret}`
					);
					console.log("magicLink", magicLink);
					await sendMail({
						subject: "Your Plagiarism AI Verification Link",
						to: email,
						component: <MagicRegister magicLink={magicLink} />,
					});
					return new Response(
						JSON.stringify({
							success: true,
							status: Status.HTTP_OK,
							message:
								"We've send an verification link to your email address.",
						}),
						{
							status: Status.HTTP_OK,
							headers: {
								"Set-Cookie": `signup_secret=${encode(
									loginSecret
								)}; Path=/;`,
							},
						}
					);
				} catch (error: any) {
					console.log("error", error);
					return new Response(
						JSON.stringify({
							success: false,
							status: error?.code ?? Status.HTTP_BAD_REQUEST,
							// message: error?.message,
							message: "Something went wrong!",
						}),
						{
							status: Status.HTTP_OK,
						}
					);
				}
			}

			if (uid && email && displayName && photoURL && apiKey) {
				try {
					try {
						user = await prisma.user.create({
							data: {
								email: email,
								name: displayName,
								avatar: photoURL,
							},
						});
					} catch (error: any) {
						console.log("Create User Error: ", error);
						throw new Error(error);
					}

					const token = jwt.sign(
						{
							user: {
								uid: user.id,
								name: user.name,
								email: user.email,
								avatar: user.avatar,
								publicId: user.publicId,
								street: user.street,
								city: user.city,
								region: user.region,
								zip: user.zip,
								country: user.country,
							},
						},
						jwtSecret,
						{
							expiresIn: 60 * timeout,
						}
					);
					return new Response(
						JSON.stringify({
							success: true,
							status: Status.HTTP_ACCEPTED,
							message: "You have successfully registered.",
						}),
						{
							status: Status.HTTP_ACCEPTED,
							headers: {
								"Set-Cookie": `token=${token}; Path=/;`,
							},
						}
					);
				} catch (error: any) {
					console.log("Error: ", error);
					throw new Error(error);
				}
			}
		}
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_NOT_FOUND,
				message: "Something went wrong.",
			}),
			{
				status: Status.HTTP_OK,
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
