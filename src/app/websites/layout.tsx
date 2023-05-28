import { Prose } from "@/components/Prose";
import { OGImageProxy } from "@/components/Tooltips";
import { classNames } from "@/utils/class";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Websites - ${process.env.APP_NAME}`,
	description: "Websites",
};

const WebsitesLayout = ({ children }: { children: any }) => {
	return (
		<>
			<h1>Websites</h1>
			<Prose
				enable={false}
				className={classNames(
					"grid grid-cols-fluid xl:grid-cols-3 gap-5"
				)}
			>
				{children}
			</Prose>
		</>
	);
};

export default WebsitesLayout;
