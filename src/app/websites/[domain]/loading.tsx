import { TextLoadingAnimation } from "@/components/animation/Lottie";
import React, { Fragment } from "react";

const DomainLoading = () => {
	return (
		<Fragment>
			<div className="relative flex justify-center items-center min-h-[70vh] w-full">
				<div className="w-screen max-w-xs">
					<TextLoadingAnimation />
				</div>
			</div>
		</Fragment>
	);
};

export default DomainLoading;
