import Link from "next/link";
import React from "react";
import BlurImage from "@/components/BlurImage";
import Tooltip, { TooltipContent } from "@/components/Tooltips";

import {
	ChartBarIcon,
	CheckBadgeIcon,
	GlobeAltIcon,
	LinkIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import Badge, { PlanBadge } from "@/components/Badge";
import { nFormatter } from "@/utils/utils";

type WebsiteCardProps = {
	id?: any;
	name?: any;
	href?: any;
	endpoint?: string;
	logo?: any;
	plan?: any;
	status?: boolean;
	payload?: any;
};

const Card = ({
	id,
	name,
	href,
	endpoint,
	logo = "https://awesomecoder.dev/img/profile.jpg",
	plan = "free",
	status = false,
	payload = {},
}: WebsiteCardProps) => {
	return (
		<Link
			key={href}
			href={`/${href}`}
			className="flex flex-col cursor-pointer space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center space-x-3">
					<BlurImage
						src={logo}
						alt={id}
						className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full"
						width={48}
						height={48}
					/>
					<div>
						<h2 className="text-lg font-medium text-gray-700 truncate w-10">
							{name}
						</h2>
						<div className="flex items-center">
							<p className="text-gray-500">{endpoint}</p>

							{payload?.length > 1 && (
								<Tooltip
									content={
										<TooltipContent
											title={`${endpoint}`}
											cta="View all domains"
											href={`/${endpoint}/`}
										/>
									}
								>
									<div>
										<Badge
											text={`+${payload?.length - 1}`}
											variant="gray"
										/>
									</div>
								</Tooltip>
							)}
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
								title="This domain is not correctly configured. Please configure your domain to start adding links."
								cta="Configure Domain"
								href={`/${endpoint}/`}
							/>
						}
					>
						<div className="flex w-8 justify-center">
							<XCircleIcon className="h-5 w-5 text-gray-300" />
						</div>
					</Tooltip>
				)}
			</div>
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-2 text-gray-500">
					<GlobeAltIcon className="h-4 w-4" />
					<h2 className="whitespace-nowrap text-sm">
						{nFormatter(payload?.posts?.length)} domain
						{payload?.posts?.length > 1 && "s"}
					</h2>
				</div>
				<div className="flex items-center space-x-2 text-gray-500">
					<LinkIcon className="h-4 w-4" />
					{payload?.posts?.length || payload?.posts?.length === 0 ? (
						<h2 className="whitespace-nowrap text-sm">
							{nFormatter(payload?.posts?.length)} link
							{payload?.posts?.length != 1 && "s"}
						</h2>
					) : (
						<div className="h-4 w-8 animate-pulse rounded-md bg-gray-200" />
					)}
				</div>
				<div className="flex items-center space-x-2 text-gray-500">
					<ChartBarIcon className="h-4 w-4" />
					<h2 className="whitespace-nowrap text-sm">
						{nFormatter(payload?.posts)} click
						{payload?.posts != 1 && "s"}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default Card;
