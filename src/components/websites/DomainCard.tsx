"use client";
import React, { Fragment, useEffect, useState } from "react";
import { DomainCardProps } from "@/types";
import Link from "next/link";
import { capitalize, isValidDomain, nFormatter, truncate } from "@/utils/utils";
import { LoadingCircle, LoadingDots } from "@/components/animation/Loading";
import {
	ArrowPathIcon,
	ArrowTopRightOnSquareIcon,
	CheckBadgeIcon,
	CheckCircleIcon,
	Cog6ToothIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Prose } from "@/components/Prose";
import { useRouter } from "next/navigation";
import { classNames } from "@/utils/class";

function DomainCard({ domain }: DomainCardProps) {
	const [posts, setPosts] = useState<number | null>(null);
	const [isValidating, setIsValidating] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			setIsValidating(false);
			setInterval(() => {
				setPosts(Math.floor(Math.random() * 1000));
			}, 4000);
		}, 3000);
	}, []);

	let data = {
		status: "Valid Configuration",
	};

	return (
		<Fragment>
			<Prose
				enable={false}
				className="flex flex-col space-y-3 rounded-lg border border-gray-100 dark:border-white/2.5 bg-white dark:bg-white/1 px-5 py-8 sm:px-10"
			>
				<div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-4">
					<div className="flex items-center space-x-2">
						<a
							href={`http://${domain}`}
							target="_blank"
							rel="noreferrer"
							className="flex items-center space-x-2"
						>
							<p className="flex items-center text-xl font-semibold">
								{domain}
							</p>
							<ArrowTopRightOnSquareIcon className="h-5 w-5" />
						</a>
						<Link
							href={`/${domain}/`}
							className="min-h-[28px] min-w-[3rem] flex items-center justify-center space-x-1 rounded-md bg-gray-100 dark:bg-zinc-50/25 px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100"
						>
							{!posts ? (
								<LoadingDots color="#6366f1" />
							) : (
								<p className="text-sm">
									{nFormatter(posts)}
									<span className="ml-1 hidden sm:inline-block">
										posts
									</span>
								</p>
							)}
						</Link>
					</div>
					<div className="flex space-x-3">
						<Button
							variant="outline"
							className={classNames(
								"items-center min-w-[97.3px] rounded-md py-2",
								isValidating && "cursor-progress "
							)}
							disabled={isValidating}
						>
							{isValidating ? (
								<LoadingDots color="#6366f1" />
							) : (
								<>
									<ArrowPathIcon className="h-4 w-4 mr-1" />
									Refresh
								</>
							)}
						</Button>
						<Button
							onClick={(e) =>
								router.push(`websites/${domain}/settings`)
							}
							className="items-center min-w-[97.3px] rounded-md py-2"
							variant="outline"
						>
							<Cog6ToothIcon className="h-4 w-4 mr-1" />
							Settings
						</Button>
					</div>
				</div>
				<div className="flex h-10 items-center space-x-5">
					<div className="flex items-center justify-between">
						{data ? (
							// data.status === "Valid Configuration" ? (
							// 	<CheckCircleFill className="h-6 w-6 text-blue-500" />
							// ) : data.status === "Pending Verification" ? (
							// 	<AlertCircleFill className="h-6 w-6 text-yellow-500" />
							// ) : (
							// 	<XCircleIcon className="h-6 w-6 text-red-500" />
							// )
							// <XCircleIcon className="h-6 w-6 text-red-500" />
							<>
								{isValidating ? (
									<LoadingCircle />
								) : (
									<CheckBadgeIcon className="mx-0.5 h-5 w-5 text-blue-500" />
								)}
							</>
						) : (
							<LoadingCircle />
						)}
						<p className="text-sm text-gray-500">
							{data ? data.status : "Checking Domain Status"}
						</p>
					</div>
				</div>
			</Prose>
		</Fragment>
	);
}

export default DomainCard;
