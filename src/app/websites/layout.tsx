import { Prose } from "@/components/Prose";
import { classNames } from "@/utils/class";

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
