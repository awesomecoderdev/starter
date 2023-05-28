import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Notifications - ${process.env.APP_NAME}`,
	description: "Notifications",
};

export default function Notifications() {
	return <div>notifications</div>;
}
