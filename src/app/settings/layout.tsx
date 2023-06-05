import { Prose } from "@/components/Prose";
import { classNames } from "@/utils/class";
import { Fragment } from "react";
import { constructMetadata } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
	title: `Settings - ${process.env.APP_NAME}`,
	description: "Settings",
});

const SettingsLayout = ({ children }: { children: any }) => {
	return (
		<Fragment>
			<Prose
				enable={false}
				className={
					classNames()
					// "grid grid-cols-fluid xl:grid-cols-3 gap-5"
				}
			>
				{children}
			</Prose>
		</Fragment>
	);
};

export default SettingsLayout;
