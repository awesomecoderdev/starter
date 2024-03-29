"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import { Prose } from "@/components/Prose";
import { SectionProvider } from "@/components/SectionProvider";
import { usePathname } from "next/navigation";
import { useMobileNavigationStore } from "@/components/MobileNavigation";
import TagManager from "react-gtm-module";

let sectionStorage: any = {
	"/": [
		{ title: "Guides", id: "guides" },
		{ title: "Resources", id: "resources" },
		{ title: "Properties", id: "properties" },
	],
	"/quickstart": [
		{ title: "Resources", id: "resources", tag: "PUT" },
		{ title: "Properties", id: "properties", tag: "POST" },
	],
};

export function Layout({ children, sections = [] }: LayoutComponentsProps) {
	const pathname = usePathname();

	// Save pathname on component mount into a REF
	const savedPathNameRef = useRef(pathname);

	function onRouteChange() {
		useMobileNavigationStore.getState().close();
	}

	useEffect(() => {
		// If REF has been changed, do the stuff
		if (savedPathNameRef.current !== pathname) {
			onRouteChange();
			// Update REF
			savedPathNameRef.current = pathname;
		}
		onRouteChange();
	}, [pathname]);

	useEffect(() => {
		// google tag manager
		TagManager.initialize({
			gtmId: "GTM-K69DMNQ",
		});
	}, []);

	sections = sections.length == 0 ? sectionStorage[pathname] ?? [] : [];
	return (
		<SectionProvider sections={sections}>
			<div className="lg:ml-72 xl:ml-80">
				<motion.header
					layoutScroll
					className="fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto border-r border-zinc-900/10 px-6 pt-4 pb-8 dark:border-white/10 lg:block xl:w-80"
				>
					<div className="hidden lg:flex">
						<Link href="/" aria-label="Home">
							<Logo className="h-6" />
						</Link>
					</div>
					<Header />
					<Navigation className="hidden lg:mt-10 lg:block" />
				</motion.header>
				<div className="relative px-4 pt-14 sm:px-6 lg:px-8">
					<main className="py-16">
						<Prose as="article">{children}</Prose>
					</main>
					<Footer />
				</div>
			</div>
		</SectionProvider>
	);
}
