import { Header } from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { cookies as getCookies } from "next/headers";
import { getCartFromCookie, getUserFromCookie } from "@/utils/buffer";
import { Metadata } from "next";

// const inter = Inter({ subsets: ["latin"] });

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const session = getUserFromCookie(token);

	let session_id = cookies.get("session_id")?.value;
	const cart = getCartFromCookie(session_id);

	return (
		<html lang="en">
			{/* <head>
				<script dangerouslySetInnerHTML={{ __html: modeScript }} />
			</head> */}
			<body className="bg-white antialiased dark:bg-zinc-900">
				<Layout cart={cart} session={session}>
					{children}
				</Layout>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: `Getting Started - ${process.env.APP_NAME}`,
	description: "Getting Started",
};
