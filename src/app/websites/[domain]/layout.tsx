import { Prose } from "@/components/Prose";
import { classNames } from "@/utils/class";

const WebsitesLayout = ({ children }: { children: any }) => {
	return (
		<>
			<Prose enable={false} className={classNames("relative")}>
				{children}
			</Prose>
		</>
	);
};

export default WebsitesLayout;
