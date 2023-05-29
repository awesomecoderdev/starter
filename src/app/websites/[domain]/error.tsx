"use client"; // Error components must be Client Components
import BlurImage from "@/components/BlurImage";
import { Prose } from "@/components/Prose";
import { CallWaiting } from "@/components/icons/Static";
import { useEffect } from "react";

export default function DomainError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<Prose>
			<div className="flex flex-col items-center justify-center rounded-md  py-12">
				<h2 className="z-10 text-xl font-semibold ">Invalid Domain.</h2>
				<CallWaiting className="pointer-events-none -my-8 w-96" />
				{/* <AddEditLinkButton
				/> */}
				<p className="mt-2 text-sm ">or edit your search filters</p>
			</div>
		</Prose>
	);
}
