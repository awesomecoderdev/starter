import { RecentLoginEmail } from "@/emails/RecentLogIn";
import { MethodNotALlowed } from "@/utils/http";
import prisma from "@/prisma/client";
import sendMail, { sendMarketingMail } from "@/emails";

export async function handler(request: Request) {}

const MethodOnlyAllowedPost = () => MethodNotALlowed({ Allow: "POST" });

export {
	handler as POST,
	MethodOnlyAllowedPost as GET,
	MethodOnlyAllowedPost as PUT,
	MethodOnlyAllowedPost as PATCH,
	MethodOnlyAllowedPost as DELETE,
	MethodOnlyAllowedPost as OPTIONS,
};
// await sendMarketingMail({
// 	subject: "✨ Welcome to Dub",
// 	to: email,
// 	component: <RecentLoginEmail />,
// });
