import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
	const secret = `${process.env.JWT_SECRET}`;
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;
	const req = await request.json();
	const { uid, email, displayName, photoURL, apiKey } = req;

	if (uid && email && displayName && photoURL && apiKey) {
		// const user = await prisma.user.create({
		// 	data: {
		// 		id: uid,
		// 		name: displayName,
		// 		email: email,
		// 		avatar: photoURL,
		// 	},
		// });

		const user: any = await prisma.user.findFirst();

		const token = jwt.sign(
			{
				user: {
					uid: user.id,
					name: user?.name,
					email: user?.email,
					avatar: user?.avatar,
				},
			},
			secret,
			{
				expiresIn: 60 * timeout,
				// expiresIn: 10,
			}
		);
		return new Response(
			JSON.stringify({
				success: true,
				status: Status.HTTP_ACCEPTED,
				message: "Successfully Authorized.",
			}),
			{
				status: Status.HTTP_ACCEPTED,
				headers: {
					"Set-Cookie": `token=${token}; Path=/;`,
					// "Set-Cookie": `token=${token}; Expires=${expired}  Secure; Path=/; Domain=localhost`,
					// "Set-Cookie": `token=${token}; Expires=${expired}; Path=/;`,
				},
			}
		);
	}
}

export async function GET(request: Request) {
	const secret = `${process.env.JWT_SECRET}`;
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;

	const token = jwt.sign(
		{
			user: {
				uid: 12121,
				name: "MD Ibrahim Kholil",
				email: "awesomecoder.dev@gmail.com",
				avatar: "https://awesomecoder.dev/img/profile.jpg",
			},
		},
		secret,
		{
			expiresIn: 60 * timeout,
			// expiresIn: 10,
		}
	);

	return new Response(
		JSON.stringify({
			success: true,
			status: Status.HTTP_ACCEPTED,
			message: "Successfully Authorized.",
		}),
		{
			status: Status.HTTP_ACCEPTED,
			headers: {
				"Set-Cookie": `token=${token}; Path=/;`,
				// "Set-Cookie": `token=${token}; Expires=${expired}  Secure; Path=/; Domain=localhost`,
				// "Set-Cookie": `token=${token}; Expires=${expired}; Path=/;`,
			},
		}
	);
}

export {
	// MethodNotALlowed as GET,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
