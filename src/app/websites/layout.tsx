"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Prose } from "@/components/Prose";
import { classNames } from "@/utils/class";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const WebsitesLayout = ({ children }: { children: any }) => {
	const pathname = usePathname();
	if (pathname == "/websites") {
		return (
			<Fragment>
				<Breadcrumbs />
				<Prose
					enable={false}
					className={classNames(
						"grid grid-cols-fluid xl:grid-cols-3 gap-5"
					)}
				>
					{children}
				</Prose>
			</Fragment>
		);
	}

	return children;
};

export default WebsitesLayout;
