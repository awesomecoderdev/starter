import { MethodNotALlowed } from "@/utils/http";
import NextAuth, { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
	// providers: [
	// 	EmailProvider({
	// 		sendVerificationRequest({ identifier, url }) {
	// 			sendMail({
	// 				subject: "Your Dub.sh Login Link",
	// 				to: identifier,
	// 				component: <LoginLink url={url} />,
	// 			});
	// 		},
	// 	}),
	// ],
	// adapter: PrismaAdapter(prisma),
	// session: { strategy: "jwt" },
	// cookies: {
	// 	sessionToken: {
	// 		name: `${
	// 			VERCEL_DEPLOYMENT ? "__Secure-" : ""
	// 		}next-auth.session-token`,
	// 		options: {
	// 			httpOnly: true,
	// 			sameSite: "lax",
	// 			path: "/",
	// 			// When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
	// 			domain: VERCEL_DEPLOYMENT ? ".dub.sh" : undefined,
	// 			secure: VERCEL_DEPLOYMENT,
	// 		},
	// 	},
	// },
	// callbacks: {
	// 	signIn: async ({ user }) => {
	// 		// if (!user.email || (await isBlacklistedEmail(user.email))) {
	// 		// 	return false;
	// 		// }
	// 		// return true;
	// 	},
	// 	jwt: async ({ token, account }) => {
	// 		if (!token.email || (await isBlacklistedEmail(token.email))) {
	// 			return {};
	// 		}
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	session: async ({ session, token }) => {
	// 		session.user = {
	// 			// @ts-ignore
	// 			id: token.sub,
	// 			...session.user,
	// 		};
	// 		return session;
	// 	},
	// },
	// events: {
	// 	async signIn(message) {
	// 		if (message.isNewUser) {
	// 			const email = message.user.email as string;
	// 			await sendMarketingMail({
	// 				subject: "✨ Welcome to Dub",
	// 				to: email,
	// 				component: <WelcomeEmail />,
	// 			});
	// 		}
	// 	},
	// },
};

const handler = () => NextAuth(options);

export {
	handler as GET,
	handler as POST,
	MethodNotALlowed as PUT,
	MethodNotALlowed as PATCH,
	MethodNotALlowed as DELETE,
	MethodNotALlowed as OPTIONS,
};
