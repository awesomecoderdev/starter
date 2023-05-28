const Loading = () => {
	return (
		<>
			{Array.from({ length: 6 }).map((_, i) => (
				<Skeleton key={i} />
			))}
		</>
	);
};

export default Loading;

function Skeleton() {
	return (
		<div className="cursor-pointer flex flex-col space-y-[46px] rounded-lg border border-gray-100 dark:border-white/2.5 bg-white dark:bg-white/1 p-6 shadow transition-all hover:shadow-md hover:dark:bg-white/2.5">
			<div className="flex items-center space-x-3">
				<div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-50/25" />
				<div className="flex flex-col space-y-2.5">
					<div className="h-5 w-36 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
					<div className="flex items-center space-x-2">
						<div className="h-5 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
						<div className="h-5 w-5 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-50/25" />
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between space-x-4 py-[4px]">
				<div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
				<div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
				<div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
			</div>
		</div>
	);
}
