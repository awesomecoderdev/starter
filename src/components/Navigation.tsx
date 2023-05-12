"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { Button } from "@/components/Button";
import { useIsInsideMobileNavigation } from "@/components/MobileNavigation";
import { useSectionStore } from "@/components/SectionProvider";
import { Tag } from "@/components/Tag";
import { remToPx } from "@/lib/remToPx";
import { classNames } from "@/utils/class";
import { usePathname } from "next/navigation";

function useInitialValue(value: any, condition = true) {
	let initialValue = useRef(value).current;
	return condition ? initialValue : value;
}

function TopLevelNavItem({ href, children }: TopLevelNavItemProps) {
	return (
		<li className="md:hidden">
			<Link
				href={href}
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
			className={classNames(
				"flex justify-between gap-2 py-1 pr-3 text-sm transition",
				isAnchorLink ? "pl-7" : "pl-4",
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
			className="absolute left-2 h-6 w-px bg-emerald-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	);
}

function NavigationGroup({ group, className }: GroupPathProps) {
	// console.log("usePathname", usePathname());

	// If this is the mobile navigation then we always render the initial
	// state, so that the state does not change during the close animation.
	// The state will still update when we re-open (re-render) the navigation.
	let isInsideMobileNavigation = useIsInsideMobileNavigation();
	let [router, sections] = useInitialValue(
		[usePathname(), useSectionStore((s) => s.sections)],
		isInsideMobileNavigation
	);

	let isActiveGroup =
		group.links.findIndex((link: any) => link.href === usePathname()) !==
		-1;

	return (
		<li className={classNames("relative mt-6", className)}>
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
							pathname={usePathname()}
						/>
					)}
				</AnimatePresence>
				<motion.div
					layout
					className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
				/>
				<AnimatePresence initial={false}>
					{isActiveGroup && (
						<ActivePageMarker
							group={group}
							pathname={usePathname()}
						/>
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
								active={link.href === usePathname()}
							>
								{link.title}
							</NavLink>
							<AnimatePresence mode="popLayout" initial={false}>
								{link.href === usePathname() &&
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
		title: "Guides",
		links: [
			{ title: "Introduction", href: "/" },
			{ title: "Quickstart", href: "/quickstart" },
			{ title: "SDKs", href: "/sdks" },
			{ title: "Authentication", href: "/authentication" },
			{ title: "Pagination", href: "/pagination" },
			{ title: "Errors", href: "/errors" },
			{ title: "Webhooks", href: "/webhooks" },
		],
	},
	{
		title: "Resources",
		links: [
			{ title: "Contacts", href: "/contacts" },
			{ title: "Conversations", href: "/conversations" },
			{ title: "Messages", href: "/messages" },
			{ title: "Groups", href: "/groups" },
			{ title: "Attachments", href: "/attachments" },
		],
	},
];

export function Navigation(props: any) {
	return (
		<nav {...props}>
			<ul role="list">
				<TopLevelNavItem href="#">API</TopLevelNavItem>
				<TopLevelNavItem href="#">Documentation</TopLevelNavItem>
				<TopLevelNavItem href="#">Support</TopLevelNavItem>
				{navigation.map((group, groupIndex) => (
					<NavigationGroup
						key={group.title}
						group={group}
						className={groupIndex === 0 && "md:mt-0"}
					/>
				))}
				<li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
					<Button variant="filled" className="w-full">
						<Link href={"#"}>Sign in</Link>
					</Button>
				</li>
			</ul>
		</nav>
	);
}
