import { classNames } from "@/utils/class";
import React from "react";

export const ArrowRightIcon = (
	{ className }: { className: any },
	props: any
) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classNames("w-5 h-5", className)}
			viewBox="0 0 20 20"
			fill="currentColor"
			{...props}
		>
			<path
				fillRule="evenodd"
				d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export default ArrowRightIcon;
