"use client";

import { Fragment, useEffect, useRef } from "react";
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
import { LayoutComponentsProps } from "@/types";
import { sensitiveRoutes } from "@/utils/route";
import { Toaster } from "sonner";
import { classNames } from "@/utils/class";

export function Layout({
	children,
	sections = [],
	session = null,
	cart = null,
}: LayoutComponentsProps) {
	const pathname = usePathname();

	const isSensitiveRoute = sensitiveRoutes.some((route) =>
		pathname.startsWith(route)
	);

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

	return (
		<SectionProvider sections={sections}>
			<Toaster duration={2000} expand={true} />
			{session?.email && isSensitiveRoute ? (
				<Fragment>
					<div className="lg:ml-60 xl:ml-64">
						<motion.header
							layoutScroll
							className="fixed inset-y-0 left-0 z-40 contents w-60 overflow-y-auto border-r border-zinc-900/10 px-6 pt-4 pb-8 dark:border-white/10 lg:block xl:w-64"
						>
							<div className="hidden lg:flex">
								<Link href="/" aria-label="Home">
									<Logo className="h-6" />
								</Link>
							</div>
							<Header
								cart={cart}
								sensitive={isSensitiveRoute}
								auth={session}
							/>
							<Navigation className="hidden lg:mt-10 lg:block" />
						</motion.header>
						<div className="relative px-6 pt-14 sm:px-7 lg:px-8">
							<main className="py-10">
								<Prose
									className={classNames(
										isSensitiveRoute && "sensitive"
									)}
									as="article"
								>
									{children}
								</Prose>
							</main>
						</div>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<motion.header
						layoutScroll
						className="relative z-40 contents px-6 pt-4 pb-8"
					>
						<Header
							cart={cart}
							sensitive={isSensitiveRoute}
							auth={session}
						/>
					</motion.header>
					<div className="relative px-6 pt-14 sm:px-7 lg:px-8">
						<main className="py-10">
							<Prose
								className={classNames(
									isSensitiveRoute && "sensitive"
								)}
								as="article"
							>
								{children}
							</Prose>
						</main>
					</div>
					<Footer />
				</Fragment>
			)}
		</SectionProvider>
	);
}
