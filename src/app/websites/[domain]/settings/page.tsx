import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import { classNames } from "@/utils/class";
import Settings from "@/components/websites/Settings";

const steps = [
	{ name: "Create account", href: "#", status: "complete" },
	{ name: "Profile information", href: "#", status: "current" },
	{ name: "Theme", href: "#", status: "upcoming" },
	{ name: "Preview", href: "#", status: "upcoming" },
];

const WebsiteSettings = () => {
	return (
		<>
			<Breadcrumbs />
			<Settings steps={steps} />
		</>
	);
};

export default WebsiteSettings;
