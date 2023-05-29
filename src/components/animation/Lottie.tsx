"use client";
import Lottie from "lottie-react";
import ServerAnimationJson from "./server.json";
import NotFoundAnimationJson from "./notfound.json";
import OppsAnimationJson from "./opps.json";
import PaperPlaneAnimationJson from "./paperplane.json";
import TextLoadingAnimationJson from "./textloading.json";

export const ServerAnimation = (props: any) => {
	return <Lottie {...props} animationData={ServerAnimationJson} />;
};

export const NotFoundAnimation = (props: any) => {
	return <Lottie {...props} animationData={NotFoundAnimationJson} />;
};

export const OppsAnimation = (props: any) => {
	return <Lottie {...props} animationData={OppsAnimationJson} />;
};

export const PaperPlaneAnimation = (props: any) => {
	return <Lottie {...props} animationData={PaperPlaneAnimationJson} />;
};

export const TextLoadingAnimation = (props: any) => {
	return <Lottie {...props} animationData={TextLoadingAnimationJson} />;
};

export default ServerAnimation;
