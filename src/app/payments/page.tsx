import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/utils/utils";

export const metadata: Metadata = constructMetadata({
	title: `Payments - ${process.env.APP_NAME}`,
	description: "Payments",
});

export default function page() {
	return <div>payments</div>;
}
