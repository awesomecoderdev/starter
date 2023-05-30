"use client";
import {
	ChevronRightIcon,
	HomeIcon,
	LinkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ArrowRightIcon from "@/components/icons/Arrow";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { classNames } from "@/utils/class";
import { capitalize } from "@/utils/utils";

// const links = [
// 	{
// 		link: "/websites",
// 		text: "Websites",
// 	},
// 	{
// 		link: "/websites/awesomecoder.dev",
// 		text: "awesomecoder.dev",
// 	},
// 	{
// 		link: "/websites/awesomecoder.dev/settings",
// 		text: "Settings",
// 	},
// ];
type LinkItem = {
	link: string;
	text: string;
};

const Breadcrumbs = () => {
	const pathname = usePathname();
	let endpoint = "/";
	let endpoints = pathname.split("/").filter(function (segment) {
		return segment.length > 0; // Exclude empty segments
	});
	const links: LinkItem[] = endpoints.map((item) => {
		endpoint += `${item}/`;
		return { text: capitalize(item), link: `${endpoint}/` };
	});

	return (
		<>
			<nav aria-label="Breadcrumb" className="flex items-center pb-6">
				<ol
					role="list"
					className="flex items-center overflow-x-auto whitespace-nowrap"
				>
					<Link
						href="/dashboard"
						className="text-gray-600 dark:text-gray-200"
					>
						<HomeIcon className="w-[17px] h-[17px] " />
					</Link>

					{links?.map((item, index) => (
						<Fragment key={item.link}>
							{item.text && item.text && (
								<Fragment>
									<span className="mx-1.5 text-gray-500 dark:text-gray-300">
										<ArrowRightIcon
											className="flex-shrink-0 w-[17px] h-[17px] mt-0.5 stroke-[1]"
											aria-hidden="true"
										/>
									</span>

									<Link
										href={`${item.link}`}
										className={classNames(
											"flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline",
											index == endpoints.length - 1 &&
												"text-primary-500 dark:text-primary-500"
										)}
									>
										{item.text}
									</Link>
								</Fragment>
							)}
						</Fragment>
					))}
				</ol>
			</nav>
		</>
	);
};

export default Breadcrumbs;
