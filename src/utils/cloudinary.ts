"use server";

import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig: any = cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME ?? "",
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? "",
	api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
	secure: true,
});

export async function getSignature() {
	const timestamp: any = Math.round(new Date().getTime() / 1000);

	const signature = cloudinary.utils.api_sign_request(
		{ timestamp, folder: "next" },
		cloudinaryConfig.api_secret
	);

	return { timestamp, signature };
}

export async function saveToDatabase({
	public_id,
	version,
	signature,
}: {
	public_id: any;
	version: any;
	signature: any;
}) {
	// verify the data
	const expectedSignature = cloudinary.utils.api_sign_request(
		{ public_id, version },
		cloudinaryConfig.api_secret
	);

	return expectedSignature === signature;
}

export async function getAvatarUrl(publicId: string) {
	return {
		// url: cloudinary.url(publicId),
		url: `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload/f_auto,q_auto:eco/${publicId}.png`,
		publicId: publicId,
	};
}

export async function deleteAvatarByID(publicId: string) {
	try {
		return (await cloudinaryConfig.uploader.destroy(
			publicId,
			(error: any, result: any) => {
				return {
					error,
					result,
				};
			}
		)) as {
			error?: any;
			result?: any;
		};
	} catch (error) {
		return {
			error,
		};
	}
}
