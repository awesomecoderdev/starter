import Status, { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { deleteAvatarByID } from "@/utils/cloudinary";
import { stripe } from "@/utils/stripe";
import { jwtSecret } from "@/utils/utils";

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
		try {
			let { user, exp } = (<jwt.JwtPayload>(
				jwt.verify(`${token}`, `${secret}`)
			)) as { user?: any; exp?: any };

			if (user) {
				return user;
			}
		} catch (error) {
			//  skip
		}
		return null;
	};

	const user = getUser();

	if (!user) {
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
			const user = await prisma.user.update({
				where: { email: email },
				data: formData,
			});

			const customer = await stripe.customers.update(`${user.stripeId}`, {
				name: name,
				email: email,
				address: {
					city: city,
					line1: street,
					postal_code: zip,
					state: region,
					country: country,
				},
				metadata: {
					user: JSON.stringify(user),
				},
			});

			const token = jwt.sign(
				{
					user: {
						uid: user.id,
						name: user?.name,
						email: user?.email,
						avatar: user?.avatar,
						street: user?.street,
						city: user?.city,
						region: user?.region,
						zip: user?.zip,
						country: user?.country,
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
