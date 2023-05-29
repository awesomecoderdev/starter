"use client";
import { HomeIcon, LinkIcon } from "@heroicons/react/24/outline";
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
			<div className="flex items-center overflow-x-auto whitespace-nowrap">
				<Link
					href="/dashboard"
					className="text-gray-600 dark:text-gray-200"
				>
					<HomeIcon className="w-5 h-5 stroke-[1.5]" />
				</Link>

				{links?.map((item, index) => (
					<Fragment key={item.link}>
						{item.text && item.text && (
							<Fragment>
								<span className="mx-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
									<ArrowRightIcon />
								</span>

								<Link
									href={`${item.link}`}
									className={classNames(
										"flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline",
										index == endpoints.length - 1 &&
											"text-primary-500"
									)}
								>
									{item.text}
								</Link>
							</Fragment>
						)}
					</Fragment>
				))}
			</div>
		</>
	);
};

export default Breadcrumbs;
