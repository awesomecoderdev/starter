import React, { Fragment } from "react";
import { classNames } from "@/utils/class";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const steps = [
	{ name: "Create account", href: "#", status: "complete" },
	{ name: "Profile information", href: "#", status: "current" },
	{ name: "Theme", href: "#", status: "upcoming" },
	{ name: "Preview", href: "#", status: "upcoming" },
];

type Step = {
	name: string;
	href: string;
	status: string;
};
type SettingsProps = {
	steps: Step[];
	className?: string;
};

const Settings = ({ steps, className }: SettingsProps, props: any) => {
	return (
		<Fragment>
			<div className="relative grid grid-cols-8">
				<div className="relative col-span-2">
					<div
						className={classNames(
							"py-4",
							// "px-4 sm:px-6 lg:px-8",
							className
						)}
						{...props}
					>
						<nav className="flex" aria-label="Progress">
							<ol role="list" className="space-y-6">
								{steps.map((step) => (
									<li key={step.name}>
										{step.status === "complete" ? (
											<button className="group">
												<span className="flex items-center">
													<span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
														<CheckCircleIcon
															className="h-full w-full text-primary-600 group-hover:scale-110 transition-all"
															aria-hidden="true"
														/>
													</span>
													<span className="transition-all ml-3 text-sm font-semibold group-hover:text-zinc-700 dark:group-hover:text-white">
														{step.name}
													</span>
												</span>
											</button>
										) : step.status === "current" ? (
											<button
												className="flex items-center"
												aria-current="step"
											>
												<span
													className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
													aria-hidden="true"
												>
													<span className="absolute h-4 w-4 rounded-full bg-primary-200 animate-ping" />
													<span className="absolute h-4 w-4 rounded-full bg-primary-200 dark:bg-primary-400" />
													<span className="relative block h-2 w-2 rounded-full bg-primary-600" />
												</span>
												<span className=" transition-all ml-3 text-sm font-semibold text-primary-600 dark:text-white">
													{step.name}
												</span>
											</button>
										) : (
											<button className="group">
												<div className="flex items-center">
													<div
														className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
														aria-hidden="true"
													>
														<div className="h-2 w-2 rounded-full bg-gray-300 group-hover:scale-110 transition-all" />
													</div>
													<p className="transition-all ml-3 text-sm font-semibold group-hover:text-zinc-700 dark:group-hover:text-white">
														{step.name}
													</p>
												</div>
											</button>
										)}
									</li>
								))}
							</ol>
						</nav>
					</div>
				</div>
				<div className="relative col-span-6">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Aliquid commodi, inventore illo quis beatae illum.
						Magnam placeat eius provident neque officia, quam minus
						non eligendi modi corporis consequatur dolore atque.
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default Settings;
