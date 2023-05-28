import { cookies as getCookies } from "next/headers";
import { getUserFromCookie } from "@/utils/buffer";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import { HeroPattern } from "@/components/HeroPattern";

export const metadata: Metadata = {
	title: `Dashboard - ${process.env.APP_NAME}`,
	description: "Dashboard",
};

export default function page() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const session = getUserFromCookie(token);

	if (!session?.email) {
		// redirect("/login");
	}

	return (
		<>
			<HeroPattern />
			Dashboard
			{session && <h1>{JSON.stringify(session, null, 2)}</h1>}
		</>
	);
}
