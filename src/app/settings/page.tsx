import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import Dropzone from "@/components/settings/Dropzone";
import { getUserFromCookie } from "@/utils/buffer";
import { constructMetadata } from "@/utils/utils";
import { cookies as getCookies } from "next/headers";
import { Metadata } from "next";
import Country from "@/components/Country";
import BlurImage from "@/components/BlurImage";
import GeneralSettings from "@/components/settings/GeneralSettings";

export const metadata: Metadata = constructMetadata({
	title: `Settings - ${process.env.APP_NAME}`,
	description: "Settings",
});

export default function Settings() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const auth = getUserFromCookie(token);
	return <GeneralSettings auth={auth} />;
}
