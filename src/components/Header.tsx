"use client";

import { Fragment, Ref, forwardRef } from "react";
import {
	MotionStyle,
	MotionValue,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";

import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import {
	MobileNavigation,
	useIsInsideMobileNavigation,
} from "@/components/MobileNavigation";
import { useMobileNavigationStore } from "@/components/MobileNavigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { classNames } from "@/utils/class";

function TopLevelNavItem({
	href,
	children,
}: {
	href: any;
	children: React.ReactNode;
}) {
	return (
		<li>
			<Link
				href={href}
				className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</Link>
		</li>
	);
}

type HeaderProps = {
	className?: string;
	auth?: any;
	cart?: any;
	sensitive?: boolean;
};

export const Header = forwardRef<HTMLHeadingElement, HeaderProps>(
	function Header(
		{ className, auth = false, cart = null, sensitive = false },
		ref: Ref<HTMLHeadingElement>
	) {
		let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
		let isInsideMobileNavigation = useIsInsideMobileNavigation();

		let { scrollY }: { scrollY: MotionValue<number> } = useScroll();
		let bgOpacityLight: MotionValue<number> = useTransform(
			scrollY,
			[0, 72],
			[0.5, 0.9]
		);
		let bgOpacityDark: MotionValue<number> = useTransform(
			scrollY,
			[0, 72],
			[0.2, 0.8]
		);

		return (
			<motion.div
				ref={ref}
				className={classNames(
					className,
					"fixed inset-x-0 top-0 z-50 px-4 transition sm:px-6 lg:z-30 lg:px-8",
					// sensitive ? "lg:justify-end" : "lg:justify-between",
					!isInsideMobileNavigation &&
						sensitive &&
						"backdrop-blur-sm dark:backdrop-blur lg:left-60 xl:left-64",
					isInsideMobileNavigation
						? "bg-white dark:bg-zinc-900"
						: "bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
				)}
				style={
					{
						"--bg-opacity-light": bgOpacityLight,
						"--bg-opacity-dark": bgOpacityDark,
					} as MotionStyle
				}
			>
				<div
					className={classNames(
						"absolute inset-x-0 top-full h-px transition",
						(isInsideMobileNavigation || !mobileNavIsOpen) &&
							"bg-zinc-900/7.5 dark:bg-white/7.5"
					)}
				/>
				<div
					className={classNames(
						"relative h-14 gap-12 flex justify-between items-center",
						sensitive ? "lg:justify-end" : "lg:justify-between",
						!sensitive && "max-w-7xl mx-auto"
					)}
				>
					<div className="flex items-center gap-5 lg:hidden">
						<MobileNavigation
							cart={cart}
							sensitive={sensitive}
							auth={auth}
						/>
						<Link href="/" aria-label="Home">
							<Logo className="h-6" />
						</Link>
					</div>
					{!sensitive && (
						<div className="hidden lg:flex">
							<Link href="/" aria-label="Home">
								<Logo className="h-6" />
							</Link>
						</div>
					)}

					<div className="flex items-center gap-5">
						<nav className="hidden md:block">
							<ul role="list" className="flex items-center gap-8">
								<TopLevelNavItem href="#">
									Getting Started
								</TopLevelNavItem>
								<TopLevelNavItem href="#">
									Pricing
								</TopLevelNavItem>
								<TopLevelNavItem href="#">
									Support
								</TopLevelNavItem>
							</ul>
						</nav>
						<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
						<div className="flex gap-4">
							<ModeToggle />
						</div>
						<div className="hidden min-[416px]:contents">
							{auth ? (
								!sensitive ? (
									<Fragment>
										<Button href="/dashboard">
											Dashboard
										</Button>
									</Fragment>
								) : (
									<Fragment>
										<Button href="/login">Profile</Button>
									</Fragment>
								)
							) : (
								<Fragment>
									<Button href="/login">Sign in</Button>
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		);
	}
);
