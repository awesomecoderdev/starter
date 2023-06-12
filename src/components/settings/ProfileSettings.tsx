"use client";
import React, { ChangeEvent, useState } from "react";
import Dropzone from "@/components/settings/Dropzone";
import Country from "@/components/Country";
import BlurImage from "@/components/BlurImage";
import { LoadingDots } from "@/components/animation/Loading";
import { Button } from "@/components/Button";
import { classNames } from "@/utils/class";
import {
	deleteAvatarByID,
	getAvatarUrl,
	getSignature,
	saveToDatabase,
} from "@/utils/cloudinary";
import axios from "@/utils/axios";
import { toast } from "sonner";

interface FormDataProps {
	name?: any;
	email?: any;
	avatar?: any;
	publicId?: any;
	street?: any;
	city?: any;
	region?: any;
	zip?: any;
	country?: any;
}

const ProfileSettings = ({ auth }: { auth?: any }) => {
	const [submitLoading, setSubmitLoading] = useState(false);
	const [avatar, setAvatar] = useState<any>(null);
	let [formData, setFormData] = useState<FormDataProps>({
		email: auth?.email,
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handelProfileSetting = async (e: any) => {
		e.preventDefault();

		const { url, publicId } = (await uploadToCloudinary()) as {
			url: string;
			publicId: string;
		};

		if (url && publicId) {
			formData = { ...formData, avatar: url, publicId: publicId };
		}

		if (Object.keys(formData).length == 1) {
			toast.error("Everything is up-to-date.");
			setSubmitLoading(false);
			return false;
		}

		try {
			axios
				.post("/api/auth/update", formData)
				.then((res) => {
					let req = res.data;
					if (req?.success) {
						setSubmitLoading(false);
						toast.success(
							req.message ?? "You have successfully logged in."
						);
					} else {
						setSubmitLoading(false);
						toast.error(req.message ?? "Something went wrong!");
					}
				})
				.catch((error) => {
					setSubmitLoading(false);
					toast.error(error.message ?? "Something went wrong!");
					if (error.response.status != 422) throw new Error(error);
				});
		} catch (error) {
			setSubmitLoading(false);
			toast.error("Something went wrong!");
		}
	};

	const uploadToCloudinary = async () => {
		if (!avatar) {
			return {
				url: null,
				publicId: null,
			};
		}

		try {
			// get a signature using server action
			const { timestamp, signature } = await getSignature();
			// upload to cloudinary using the signature
			const formData = new FormData();
			formData.append("file", avatar);
			formData.append(
				"api_key",
				process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? ""
			);
			formData.append("signature", signature);
			formData.append("timestamp", timestamp);
			formData.append("folder", "next");
			const endpoint =
				process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL ?? "";
			const data = await fetch(endpoint, {
				method: "POST",
				body: formData,
			}).then((res) => res.json());
			// write to database using server actions
			// await saveToDatabase({
			// 	version: data?.version,
			// 	signature: data?.signature,
			// 	public_id: data?.public_id,
			// });

			if (!data?.public_id) {
				return {
					url: null,
					publicId: null,
				};
			}

			return await getAvatarUrl(data?.public_id);
		} catch (error) {
			return {
				url: null,
				publicId: null,
			};
		}
	};

	return (
		<form
			className="py-3 space-y-6"
			onSubmit={(e) => handelProfileSetting(e)}
			encType="multipart/form-data"
		>
			<div className="relative">
				<div className="md:grid lg:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h2 className="text-lg font-medium leading-6 p-0 m-0">
							Profile
						</h2>
						<p className="mt-1 text-sm ">
							This information will be shared with stripe so be
							careful what you share.
						</p>
					</div>
					<div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
						<div>
							<label className="block text-sm font-medium p-0 m-0">
								Avatar
							</label>
							<Dropzone
								setAvatar={setAvatar}
								auth={auth}
								className="lg:flex hidden"
							/>
						</div>

						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm font-medium "
								>
									Name
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="name"
									id="name"
									autoComplete="name"
									defaultValue={auth?.name ?? ""}
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="email"
									className="block text-sm font-medium "
								>
									Email address
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="email"
									id="email"
									defaultValue={auth?.email ?? ""}
									readOnly
									autoComplete="email"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pointer-events-none"
								/>
							</div>

							<div className="col-span-6">
								<label
									htmlFor="street"
									className="block text-sm font-medium "
								>
									Street address
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="street"
									id="street"
									defaultValue={auth?.street ?? ""}
									autoComplete="street-address"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-6 lg:col-span-2">
								<label
									htmlFor="city"
									className="block text-sm font-medium "
								>
									City
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="city"
									defaultValue={auth?.city ?? ""}
									id="city"
									autoComplete="address-level2"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium "
								>
									State / Province
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="region"
									defaultValue={auth?.region ?? ""}
									id="region"
									autoComplete="address-level1"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium "
								>
									ZIP / Postal code
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									defaultValue={auth?.zip ?? ""}
									name="zip"
									id="postal-code"
									autoComplete="postal-code"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm font-medium"
								>
									Country
								</label>
								<Country
									onChange={handleInputChange}
									id="country"
									name="country"
									autoComplete="country-name"
									defaultValue={
										auth.country
											? auth.country
											: "Palestine"
									}
									className="cursor-pointer mt-1 block w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<Button
					variant="outline"
					type="submit"
					onClick={() => setSubmitLoading(true)}
					className={classNames(
						"text-sm font-medium flex items-center justify-center w-32 rounded-md p-2 transition-all duration-75 dark:text-white",
						submitLoading &&
							"justify-center min-h-[40px] pointer-events-none"
					)}
				>
					{submitLoading ? <LoadingDots /> : "Save Changes"}
				</Button>
			</div>
		</form>
	);
};

export default ProfileSettings;
