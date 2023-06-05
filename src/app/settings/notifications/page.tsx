import React, { Fragment } from "react";
import { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import NotificationsCard from "@/components/settings/NotificationsCard";

export const metadata: Metadata = {
	title: `Notifications - ${process.env.APP_NAME}`,
	description: "Notifications",
};

export default function Notifications() {
	return (
		<Fragment>
			<NotificationsCard />
		</Fragment>
	);
}
