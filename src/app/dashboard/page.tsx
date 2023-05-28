import React from "react";
import { cookies as getCookies } from "next/headers";
import { getUserFromCookie } from "@/utils/buffer";
import { redirect } from "next/navigation";

export default function page() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const session = getUserFromCookie(token);

	if (!session?.email) {
		// redirect("/login");
	}

	return (
		<div>
			Dashboard
			{session && <h1>{JSON.stringify(session, null, 2)}</h1>}
		</div>
	);
}
