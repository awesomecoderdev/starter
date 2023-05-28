import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Payments - ${process.env.APP_NAME}`,
	description: "Payments",
};

export default function page() {
	return <div>payments</div>;
}
