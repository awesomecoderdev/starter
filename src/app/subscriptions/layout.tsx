import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Subscriptions - ${process.env.APP_NAME}`,
	description: "Subscriptions",
};
const Layout = ({ children }: { children: any }) => {
	return children;
};

export default Layout;
