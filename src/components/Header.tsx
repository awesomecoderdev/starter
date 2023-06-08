"use client";

import { Fragment, Ref, forwardRef, useState } from "react";
import {
	MotionStyle,
	MotionValue,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";

import {
	Disclosure,
	Menu,
	RadioGroup,
	Switch,
	Transition,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
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
import BlurImage from "./BlurImage";
import {
	ArrowUpOnSquareStackIcon,
	Cog6ToothIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { LoadingDots } from "./animation/Loading";
import axios from "@/utils/axios";
import { error } from "console";
import { toast } from "sonner";
import Image from "next/image";

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
		const pathname = usePathname();
		let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
		let isInsideMobileNavigation = useIsInsideMobileNavigation();
		const [logoutLoading, setLogoutLoading] = useState(false);

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
						<Link
							href="/"
							aria-label="Home"
							onClick={(e) =>
								useMobileNavigationStore.getState().close()
							}
						>
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
						{!sensitive && (
							<Fragment>
								<nav className="hidden md:block">
									<ul
										role="list"
										className="flex items-center gap-8"
									>
										<TopLevelNavItem href="#">
											Getting Started
										</TopLevelNavItem>
										<TopLevelNavItem href="/pricing">
											Pricing
										</TopLevelNavItem>
										<TopLevelNavItem href="#">
											Support
										</TopLevelNavItem>
									</ul>
								</nav>
								<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
							</Fragment>
						)}
						<div className="flex gap-4">
							<ModeToggle />
						</div>
						<div
							className={classNames(
								!auth &&
									!sensitive &&
									"hidden min-[416px]:contents" // old
							)}
						>
							{auth ? (
								<Fragment>
									<Button
										variant="filled"
										href="/dashboard"
										className={classNames(
											!sensitive
												? "lg:block hidden"
												: "hidden"
										)}
									>
										Dashboard
									</Button>
									<Menu
										as="div"
										className={classNames(
											"relative flex-shrink-0 ",
											!sensitive && "lg:hidden"
										)}
									>
										<div>
											<Menu.Button className="flex rounded-full focus:outline-none">
												<span className="sr-only">
													Open user menu
												</span>
												<div className="h-8 w-8 rounded-full overflow-hidden">
													<BlurImage
														src={`${auth.avatar}`}
														alt={auth.name}
														width={100}
														height={100}
														noblur="true"
														priority
														onLoad={() => {
															URL.revokeObjectURL(
																auth.avatar
															);
														}}
														className="h-full w-full object-cover"
													/>
												</div>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											{/* <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right flex flex-col space-y-px rounded-md bg-white dark:bg-zinc-900/90 p-3 sm:w-56 shadow-lg ring-1 ring-black dark:ring-zinc-700/[0.35] ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/settings/profile"
															onClick={(e) =>
																useMobileNavigationStore
																	.getState()
																	.close()
															}
															className={classNames(
																"flex items-center text-zinc-900 dark:text-zinc-100 w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 hover:dark:bg-zinc-700/[0.30] active:bg-gray-200",
																active &&
																	pathname ==
																		"/settings/profile" &&
																	"bg-gray-100 dark:bg-zinc-700/[0.30]"
															)}
														>
															<UserCircleIcon className="h-4 w-4 mr-2" />
															Profile
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/settings"
															onClick={(e) =>
																useMobileNavigationStore
																	.getState()
																	.close()
															}
															className={classNames(
																"flex items-center text-zinc-900 dark:text-zinc-100 w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 hover:dark:bg-zinc-700/[0.30] active:bg-gray-200",
																active &&
																	pathname ==
																		"/settings" &&
																	"bg-gray-100 dark:bg-zinc-700/[0.30]"
															)}
														>
															<Cog6ToothIcon className="h-4 w-4 mr-2" />
															Settings
														</Link>
													)}
												</Menu.Item>
												<button
													className={classNames(
														"flex items-center text-zinc-900 dark:text-zinc-100 w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 hover:dark:bg-zinc-700/[0.30] active:bg-gray-200",
														logoutLoading &&
															"justify-center bg-gray-100 dark:bg-zinc-700/[0.30] min-h-[40px]"
													)}
													onClick={(e) => logout(e)}
												>
													{logoutLoading ? (
														<LoadingDots />
													) : (
														<>
															<ArrowUpOnSquareStackIcon className="h-4 w-4 mr-2 transform rotate-90" />
															Logout
														</>
													)}
												</button>
											</Menu.Items>
										</Transition>
									</Menu>
								</Fragment>
							) : (
								<Fragment>
									<Button variant="filled" href="/login">
										Sign in
									</Button>
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		);
	}
);
