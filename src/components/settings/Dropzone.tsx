"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getSignature, saveToDatabase } from "../../utils/cloudinary";
import { classNames } from "@/utils/class";
import { toast } from "sonner";

const Dropzone = ({
	className,
	auth,
	setAvatar,
}: {
	className?: any;
	auth?: any;
	setAvatar: any;
}) => {
	const [files, setFiles] = useState<any>([]);
	const avatarInput = useRef<any>(null);

	const onDrop = useCallback(
		(acceptedFiles: any[], rejectedFiles: any) => {
			if (acceptedFiles?.length) {
				setFiles([]);
				setAvatar([]);

				let newUpload = [
					...acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					),
				];
				setFiles(newUpload);
				setAvatar(newUpload[0]);
			}

			if (rejectedFiles?.length) {
				// setFiles([]);
				// setAvatar([])
				toast.error("Unacceptable file type or file size!");
			}
		},
		[setAvatar]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"image/*": [],
		},
		maxSize: 1024 * 1000,
		maxFiles: 1,
		onDrop,
	});

	useEffect(() => {
		// Revoke the data uris to avoid memory leaks
		return () =>
			files.forEach((file: any) => URL.revokeObjectURL(file.preview));
	}, [files]);

	async function action() {
		const file = files[0];
		if (!file) return;

		// get a signature using server action
		const { timestamp, signature } = await getSignature();

		// upload to cloudinary using the signature
		const formData = new FormData();

		formData.append("file", file);
		formData.append(
			"api_key",
			process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? ""
		);
		formData.append("signature", signature);
		formData.append("timestamp", timestamp);
		formData.append("folder", "next");

		const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL ?? "";
		const data = await fetch(endpoint, {
			method: "POST",
			body: formData,
		}).then((res) => res.json());

		// write to database using server actions
		await saveToDatabase({
			version: data?.version,
			signature: data?.signature,
			public_id: data?.public_id,
		});
	}

	return (
		<Fragment>
			<div className="flex items-center mt-1 space-x-5 ">
				<div className="relative h-12 w-12 overflow-hidden rounded-full">
					<Image
						src={files.length > 0 ? files[0].preview : auth.avatar}
						alt={auth.name}
						width={100}
						height={100}
						onLoad={() => {
							URL.revokeObjectURL(
								files.length > 0
									? files[0].preview
									: auth.avatar
							);
						}}
						className="h-full w-full rounded-md object-cover p-0 m-0"
					/>
				</div>
				<button
					onClick={(e) => avatarInput.current.click()}
					type="button"
					className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					Change
				</button>
			</div>
			<div
				{...getRootProps({
					className: classNames(
						"mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6",
						className
					),
				})}
			>
				<div className="space-y-1 text-center">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 48 48"
						aria-hidden="true"
					>
						<path
							d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<div className="flex text-sm text-gray-600">
						<span className="relative cursor-pointer rounded-md font-medium text-primary-600 focus-within:outline-none p-0 m-0">
							<span className="p-0 m-0">Upload a file</span>
							<input
								{...getInputProps({ name: "file" })}
								ref={avatarInput}
							/>
						</span>
						<p className=" p-0 m-0 pl-1">
							{isDragActive
								? "drop the files here"
								: "or drag and drop"}
						</p>
					</div>
					<p className="text-xs text-gray-500  p-0 m-0 ">
						PNG, JPG, GIF up to 1MB
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default Dropzone;
