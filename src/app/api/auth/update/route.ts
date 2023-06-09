import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { deleteAvatarByID } from "@/utils/cloudinary";

export async function POST(request: Request) {
	const secret = `${process.env.JWT_SECRET}`;
	const cookie = cookies();
	const JwtToken = cookie.get("token");
	const token = JwtToken?.value;
	const timeout: number = parseInt(`${process.env.JWT_TIMEOUT}`) || 60;

	const req = await request.json();
	const {
		name,
		email,
		street,
		city,
		region,
		zip,
		country,
		avatar,
		publicId,
	} = req;

	let formData = {
		name,
		street,
		city,
		region,
		zip,
		country,
	} as {
		name: any;
		street: any;
		city: any;
		region: any;
		zip: any;
		country: any;
		avatar: any;
		publicId: any;
	};

	const getUser = () => {
		let { user, exp } = (<jwt.JwtPayload>(
			jwt.verify(`${token}`, `${secret}`)
		)) as { user?: any; exp?: any };

		if (user) {
			return user;
		}
		return null;
	};

	const user = getUser();

	if (avatar && publicId) {
		formData = { ...formData, avatar: avatar, publicId: publicId };
		try {
			if (user?.publicId) {
				const { error, result } = await deleteAvatarByID(user.publicId);
				if (error) {
					console.log("Error: delete avatar => ", error);
				} else {
					console.log("Result: delete avatar => ", result);
				}
			}
		} catch (error: any) {
			// skip
		}
	}

	if (email == user?.email) {
		try {
			const authorization = await prisma.user.update({
				where: { email: email },
				data: formData,
			});

			const token = jwt.sign(
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
				secret,
				{
					expiresIn: 60 * timeout,
					// expiresIn: 10,
				}
			);
			return new Response(
				JSON.stringify({
					success: true,
					status: Status.HTTP_OK,
					message: "Successfully Updated.",
				}),
				{
					status: Status.HTTP_OK,
					headers: {
						"Set-Cookie": `token=${token}; Path=/;`,
						// "Set-Cookie": `token=${token}; Expires=${expired}  Secure; Path=/; Domain=localhost`,
						// "Set-Cookie": `token=${token}; Expires=${expired}; Path=/;`,
					},
				}
			);
		} catch (error) {
			return new Response(
				JSON.stringify({
					success: false,
					status: Status.HTTP_OK,
					message: "Something Went Wrong!",
				}),
				{
					status: Status.HTTP_OK,
				}
			);
		}
	} else {
		return new Response(
			JSON.stringify({
				success: false,
				status: Status.HTTP_OK,
				message: "Unauthorized Access!",
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
