import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import { getUserFromCookie } from "@/utils/buffer";
import { cookies as getCookies } from "next/headers";
import { Metadata } from "next";
import ProfileSettings from "@/components/settings/ProfileSettings";

export const metadata: Metadata = {
	title: `Profile - ${process.env.APP_NAME}`,
	description: "Profile",
};

export default function Profile() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const auth = getUserFromCookie(token);
	return <ProfileSettings auth={auth} />;
}
