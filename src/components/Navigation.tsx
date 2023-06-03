"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { Button } from "@/components/Button";
import {
	useIsInsideMobileNavigation,
	useMobileNavigationStore,
} from "@/components/MobileNavigation";
import { useSectionStore } from "@/components/SectionProvider";
import { Tag } from "@/components/Tag";
import { remToPx } from "@/lib/remToPx";
import { classNames } from "@/utils/class";
import { usePathname } from "next/navigation";
import {
	LinkIcon,
	HomeIcon,
	Cog6ToothIcon,
	BellAlertIcon,
	CreditCardIcon,
	CurrencyDollarIcon,
	BanknotesIcon,
	UserCircleIcon,
	ArrowUpOnSquareStackIcon,
	RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { GroupPathProps, NavLinkProps, TopLevelNavItemProps } from "@/types";
import axios from "@/utils/axios";
import { toast } from "sonner";
import { LoadingDots } from "./animation/Loading";

function useInitialValue(value: any, condition = true) {
	let initialValue = useRef(value).current;
	return condition ? initialValue : value;
}

function TopLevelNavItem({ href, children }: TopLevelNavItemProps) {
	return (
		<li className="md:hidden">
			<Link
				href={href}
				onClick={(e) => useMobileNavigationStore.getState().close()}
				className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</Link>
		</li>
	);
}

function NavLink({
	href,
	tag,
	active,
	isAnchorLink = false,
	children,
}: NavLinkProps) {
	return (
		<Link
			href={href}
			aria-current={active ? "page" : undefined}
			onClick={(e) => useMobileNavigationStore.getState().close()}
			className={classNames(
				"flex justify-between gap-2 py-1 pr-3 text-sm transition",
				isAnchorLink ? "pl-7" : "pl-2",
				active
					? "text-zinc-900 dark:text-white"
					: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			)}
		>
			<span className="truncate">{children}</span>
			{tag && (
				<Tag variant="small" color="zinc">
					{tag}
				</Tag>
			)}
		</Link>
	);
}

function VisibleSectionHighlight({ group, pathname }: GroupPathProps) {
	let [sections, visibleSections] = useInitialValue(
		[
			useSectionStore((s) => s.sections),
			useSectionStore((s) => s.visibleSections),
		],
		useIsInsideMobileNavigation()
	);

	let isPresent = useIsPresent();
	let firstVisibleSectionIndex = Math.max(
		0,
		[{ id: "_top" }, ...sections].findIndex(
			(section) => section.id === visibleSections[0]
		)
	);
	let itemHeight = remToPx(2);
	let height = isPresent
		? Math.max(1, visibleSections.length) * itemHeight
		: itemHeight;
	let top =
		group.links.findIndex((link: any) => link.href === pathname) *
			itemHeight +
		firstVisibleSectionIndex * itemHeight;

	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
			style={{ borderRadius: 8, height, top }}
		/>
	);
}

function ActivePageMarker({ group, pathname }: GroupPathProps) {
	let itemHeight = remToPx(2);
	let offset = remToPx(0.25);
	let activePageIndex = group.links.findIndex(
		(link: any) => link.href === pathname
	);
	let top = offset + activePageIndex * itemHeight;

	return (
		<motion.div
			layout
			className="absolute left-2 h-6 w-px bg-primary-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	);
}

function NavigationGroup({ group, className }: GroupPathProps) {
	const pathname = usePathname();

	// If this is the mobile navigation then we always render the initial
	// state, so that the state does not change during the close animation.
	// The state will still update when we re-open (re-render) the navigation.
	let isInsideMobileNavigation = useIsInsideMobileNavigation();
	// let [router, sections] = useInitialValue(
	// 	[useRouter(), useSectionStore((s) => s.sections)],
	// 	isInsideMobileNavigation
	// );

	let [router, sections] = useInitialValue(
		[pathname, useSectionStore((s) => s.sections)],
		isInsideMobileNavigation
	);

	let isActiveGroup =
		group.links.findIndex((link: any) => link.href === pathname) !== -1;

	return (
		<li className={classNames("relative", className)}>
			<motion.h2
				layout="position"
				className="text-xs font-semibold text-zinc-900 dark:text-white"
			>
				{group.title}
			</motion.h2>
			<div className="relative mt-3 pl-2">
				<AnimatePresence initial={!isInsideMobileNavigation}>
					{isActiveGroup && (
						<VisibleSectionHighlight
							group={group}
							pathname={pathname}
						/>
					)}
				</AnimatePresence>
				<motion.div
					layout
					className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
				/>
				<AnimatePresence initial={false}>
					{isActiveGroup && (
						<ActivePageMarker group={group} pathname={pathname} />
					)}
				</AnimatePresence>
				<ul role="list" className="border-l border-transparent">
					{group.links.map((link: any) => (
						<motion.li
							key={link.href}
							layout="position"
							className="relative"
						>
							<NavLink
								href={link.href}
								active={link.href === pathname}
							>
								<span className="flex items-center">
									{link.icon && (
										<link.icon className="h-4 w-4 mr-1.5" />
									)}
									{link.title}
								</span>
							</NavLink>
							<AnimatePresence mode="popLayout" initial={false}>
								{link.href === pathname &&
									sections.length > 0 && (
										<motion.ul
											role="list"
											initial={{ opacity: 0 }}
											animate={{
												opacity: 1,
												transition: { delay: 0.1 },
											}}
											exit={{
												opacity: 0,
												transition: { duration: 0.15 },
											}}
										>
											{sections.map((section: any) => (
												<li key={section.id}>
													<NavLink
														href={`${link.href}#${section.id}`}
														tag={section.tag}
														isAnchorLink
													>
														{section.title}
													</NavLink>
												</li>
											))}
										</motion.ul>
									)}
							</AnimatePresence>
						</motion.li>
					))}
				</ul>
			</div>
		</li>
	);
}

export const navigation = [
	{
		title: "General",
		links: [
			{
				title: "Dashboard",
				href: "/dashboard",
				icon: RectangleGroupIcon,
			},
			{ title: "Websites", href: "/websites", icon: LinkIcon },
		],
	},
	{
		title: "Subscriptions",
		links: [
			{
				title: "Subscriptions",
				href: "/subscriptions",
				icon: CurrencyDollarIcon,
			},
			{
				title: "Payments",
				href: "/payments",
				icon: BanknotesIcon,
			},
		],
	},
	{
		title: "Settings",
		links: [
			{ title: "General", href: "/settings", icon: Cog6ToothIcon },
			{
				title: "Profile",
				href: "/settings/profile",
				icon: UserCircleIcon,
			},
			{
				title: "Notification",
				href: "/settings/notifications",
				icon: BellAlertIcon,
			},
			{
				title: "Billing",
				href: "/settings/billing",
				icon: CreditCardIcon,
			},
		],
	},
];

type HeaderProps = {
	auth?: any;
	className?: any;
	cart?: any;
	sensitive?: boolean;
};

export function Navigation({
	auth = false,
	cart = null,
	sensitive = false,
	className,
	...props
}: HeaderProps) {
	const [logoutLoading, setLogoutLoading] = useState(false);

	const logout = async (e: any) => {
		setLogoutLoading(true);
		axios
			.post("/api/auth/logout")
			.then((res) => {
				toast.success("You have successfully logged out!");
				location.reload();
			})
			.catch((error) => {
				toast.error("Something went wrong!");
			});
	};

	return (
		<nav className={classNames(className)}>
			<ul role="list">
				{!sensitive && (
					<Fragment>
						<TopLevelNavItem href="#">
							Getting Started
						</TopLevelNavItem>
						<TopLevelNavItem href="/pricing">
							Pricing
						</TopLevelNavItem>
						<TopLevelNavItem href="#">Support</TopLevelNavItem>
					</Fragment>
				)}

				{navigation.map((group, groupIndex) => (
					<NavigationGroup
						key={group.title}
						group={group}
						className={classNames(
							groupIndex === 0 && "md:mt-0",
							!auth && "hidden",
							!sensitive && "md:block hidden"
						)}
					/>
				))}

				<li
					className={classNames(
						// "sticky bottom-0 z-10 mt-6 min-[416px]:hidden",
						"sticky bottom-0 z-10 mt-6 md:hidden"
					)}
				>
					{auth ? (
						!sensitive ? (
							<Button
								variant="filled"
								className="w-full flex items-center"
								href="/dashboard"
							>
								<RectangleGroupIcon className="h-4 w-4 mr-2" />
								Dashboard
							</Button>
						) : (
							<Button
								variant="filled"
								className={classNames(
									"w-full flex items-center hover:bg-zinc-900 dark:hover:bg-primary-500",
									logoutLoading &&
										"justify-center min-h-[32px]"
								)}
								onClick={(e) => logout(e)}
							>
								{logoutLoading ? (
									<LoadingDots className="bg-white" />
								) : (
									<>
										<ArrowUpOnSquareStackIcon className="h-4 w-4 mr-2 transform rotate-90" />
										Logout
									</>
								)}
							</Button>
						)
					) : (
						<Button
							variant="filled"
							className="w-full"
							href="/login"
						>
							Sign in
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
}
