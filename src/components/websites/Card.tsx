"use client";
import Link from "next/link";
import React from "react";
import BlurImage from "@/components/BlurImage";
import Tooltip, { TooltipContent } from "@/components/Tooltips";

import {
	ChartBarIcon,
	CheckBadgeIcon,
	DocumentTextIcon,
	GlobeAltIcon,
	LinkIcon,
	ShieldCheckIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import Badge from "@/components/Badge";
import { getLocation, nFormatter } from "@/utils/utils";

type WebsiteCardProps = {
	id?: any;
	name?: any;
	href?: any;
	endpoint?: any;
	logo?: any;
	status?: boolean;
	payload?: any;
};

const Card = ({
	id,
	name,
	href,
	endpoint,
	logo = "https://awesomecoder.dev/img/profile.jpg",
	status = false,
	payload = {},
}: WebsiteCardProps) => {
	const { hostname, host, protocol } = getLocation(`${endpoint}`);
	return (
		<div
			key={href}
			// href={`/websites/${href}`}
			className="flex flex-col cursor-pointer space-y-10 rounded-lg border border-gray-100 dark:border-white/2.5 bg-white dark:bg-white/1 p-6 shadow transition-all hover:shadow-lg hover:dark:bg-white/2.5 text-zinc-700 dark:text-zinc-100"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center space-x-3">
					<Link href={`/websites/${hostname}/`}>
						<BlurImage
							src={logo}
							alt={id}
							className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full"
							width={48}
							height={48}
						/>
					</Link>

					<div>
						<Link
							href={`/websites/${hostname}/`}
							className="text-lg block font-medium truncate w-36"
						>
							{name}
						</Link>
						<div className="flex items-center">
							{/* {payload?.length > 1 && ( */}
							<Tooltip
								content={
									<TooltipContent
										title={`${name} - ${protocol}//${hostname}`}
										href={`/websites/${hostname}/settings`}
									/>
								}
							>
								<Link
									href={`/websites/${hostname}/`}
									className="text-gray-500"
								>
									{endpoint}
								</Link>
							</Tooltip>
							{/*  )} */}
						</div>
					</div>
				</div>
				{status ? (
					<Tooltip content="Verified domain">
						<div className="flex w-8 justify-center">
							<CheckBadgeIcon className="h-5 w-5 text-blue-500" />
						</div>
					</Tooltip>
				) : (
					<Tooltip
						content={
							<TooltipContent
								title="This domain is not correctly configured. Please configure your domain to start scan."
								cta="Configure Domain"
								href={`/websites/${hostname}/settings`}
							/>
						}
					>
						<div className="flex w-8 justify-center">
							<XCircleIcon className="h-5 w-5 text-red-400" />
						</div>
					</Tooltip>
				)}
			</div>
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-1.5 text-gray-500 dark:text-zinc-300">
					<DocumentTextIcon className="h-4 w-4" />
					<h2 className="whitespace-nowrap text-sm">
						{nFormatter(payload?.posts)} post
						{payload?.posts > 1 && "s"}
					</h2>
				</div>
				<div className="flex items-center space-x-1.5 text-gray-500 dark:text-zinc-300">
					<LinkIcon className="h-4 w-4" />
					{/* {payload?.posts ? (
						<h2 className="whitespace-nowrap text-sm">
							{nFormatter(payload?.posts)} link
							{payload?.posts > 1 && "s"}
						</h2>
					) : (
						<div className="h-4 w-8 animate-pulse rounded-md bg-gray-200" />
					)} */}
					<h2 className="whitespace-nowrap text-sm">
						{nFormatter(payload?.posts)} url
						{payload?.posts > 1 && "s"}
					</h2>
				</div>
				<div className="flex items-center space-x-1.5 text-gray-500 dark:text-zinc-300">
					<ShieldCheckIcon className="h-4 w-4" />
					<h2 className="whitespace-nowrap text-sm">
						{nFormatter(payload?.posts)} scan
					</h2>
				</div>
			</div>
		</div>
	);
};

export default Card;
