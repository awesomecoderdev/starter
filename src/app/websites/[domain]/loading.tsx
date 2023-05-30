import { BreadcrumbsSkeleton } from "@/components/Breadcrumbs";
import { TextLoadingAnimation } from "@/components/animation/Lottie";
import { classNames } from "@/utils/class";
import React, { Fragment } from "react";

const DomainLoading = () => {
	return (
		<Fragment>
			<DomainSkeleton />
		</Fragment>
	);
};

export default DomainLoading;

export function DomainSkeleton({ className }: { className?: string }) {
	return (
		<Fragment>
			<BreadcrumbsSkeleton />
			<div
				className={classNames(
					"flex flex-col space-y-3 rounded-lg border border-gray-100 dark:border-white/2.5 bg-white dark:bg-white/1 px-5 py-8 sm:px-10",
					className
				)}
			>
				<div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-4">
					<div className="flex items-center space-x-2">
						<div className="h-6 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
						<div className="h-6 w-32 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-50/25" />
					</div>
					<div className="flex space-x-3">
						<div className="h-9 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
						<div className="h-9 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
					</div>
				</div>
				<div className="flex h-10 items-center space-x-5">
					<div className="flex items-center space-x-2">
						<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-50/25" />
						<div className="h-5 w-36 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
					</div>
					<div className="flex items-center space-x-2">
						<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-50/25" />
						<div className="h-5 w-36 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
