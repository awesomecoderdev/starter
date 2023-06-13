import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import sendMail from "@/emails";
import MagicLogin from "@/emails/MagicLogin";
import { getAppUrl, jwtSecret, nanoid } from "@/utils/utils";
import { encode } from "@/utils/buffer";

export async function POST(request: Request) {
	const secret = `${process.env.JWT_SECRET}`;
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;

	try {
		const req = await request.json();
		const { uid, email, displayName, photoURL, apiKey } = req;

		try {
			if (!email) {
				return new Response(
					JSON.stringify({
						success: false,
						status: Status.HTTP_NOT_FOUND,
						message: "No account found with that email address.",
					}),
					{
						status: Status.HTTP_OK,
					}
				);
			} else {
				const user: any = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});

				if (!user) {
					return new Response(
						JSON.stringify({
							success: false,
							status: Status.HTTP_OK,
							message:
								"No account found with that email address.",
						}),
						{
							status: Status.HTTP_OK,
						}
					);
				}

				if (email && !uid && !displayName) {
					try {
						const loginSecret = nanoid();
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

						const loginToken = jwt.sign(
							{ token: token },
							jwtSecret,
							{
								expiresIn: 60 * 15,
							}
						);

						const verificationToken = encode(loginToken);
						const magicLink = getAppUrl(
							`login/?token=${loginSecret}${verificationToken}&secret=${loginSecret}`
						);
						console.log("magicLink", magicLink);

						await sendMail({
							subject: "Your Plagiarism AI Login Link",
							to: email,
							component: (
								<MagicLogin user={user} magicLink={magicLink} />
							),
						});

						return new Response(
							JSON.stringify({
								success: true,
								status: Status.HTTP_OK,
								message:
									"We've send an login link to your email address.",
							}),
							{
								status: Status.HTTP_OK,
								headers: {
									"Set-Cookie": `login_secret=${encode(
										loginSecret
									)}; Path=/;`,
								},
							}
						);
					} catch (error: any) {
						return new Response(
							JSON.stringify({
								success: false,
								status: error?.code,
								message: error?.message,
							}),
							{
								status: Status.HTTP_OK,
							}
						);
					}
				}

				if (uid && email && displayName && photoURL && apiKey) {
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
							message: "You have successfully logged in.",
						}),
						{
							status: Status.HTTP_ACCEPTED,
							headers: {
								"Set-Cookie": `token=${token}; Path=/;`,
							},
						}
					);
				}
			}
		} catch (error) {
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
	} catch (error: any) {
		console.log("\n==================================\n");
		console.log("Error:", error);
		console.log("\n==================================\n");

		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_BAD_REQUEST,
				message: "Something went wrong.",
			}),
			{
				status: Status.HTTP_OK,
			}
		);
	}
}

// export async function GET(request: Request) {
// 	const secret = `${process.env.JWT_SECRET}`;
// 	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;

// 	const token = jwt.sign(
// 		{
// 			user: {
// 				uid: 12121,
// 				name: "MD Ibrahim Kholil",
// 				email: "awesomecoder.dev@gmail.com",
// 				avatar: "https://awesomecoder.dev/img/profile.jpg",
// 			},
// 		},
// 		jwtSecret,
// 		{
// 			expiresIn: 60 * timeout,
// 			// expiresIn: 10,
// 		}
// 	);

// 	return new Response(
// 		JSON.stringify({
// 			success: true,
// 			status: Status.HTTP_ACCEPTED,
// 			message: "Successfully Authorized.",
// 		}),
// 		{
// 			status: Status.HTTP_ACCEPTED,
// 			headers: {
// 				"Set-Cookie": `token=${token}; Path=/;`,
// 				// "Set-Cookie": `token=${token}; Expires=${expired}  Secure; Path=/; Domain=localhost`,
// 				// "Set-Cookie": `token=${token}; Expires=${expired}; Path=/;`,
// 			},
// 		}
// 	);
// }

export {
	MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
