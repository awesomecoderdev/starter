"use client";
import useCart from "@/utils/cart";
import { classNames } from "@/utils/class";
import { Fragment, useEffect, useState } from "react";

export default function Cart() {
	const [isMounted, setIsMounted] = useState(false);
	let { items, addItem, removeItem, clearCart, getTotal } = useCart();
	const totalPrice = getTotal();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div>
			<h2>Cart</h2>

			{!isMounted ? (
				<>
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} />
					))}
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton className="xl:block hidden" key={i} />
					))}
				</>
			) : (
				<Fragment>
					{items.length === 0 ? (
						<p>Your cart is empty.</p>
					) : (
						<div>
							{items?.map((item: any) => (
								<div key={item.id}>
									{item.name} - ${item.price}
									<strong>
										{JSON.stringify(item, null, 2)}
									</strong>
									<button onClick={() => removeItem(item.id)}>
										Remove
									</button>
								</div>
							))}
						</div>
					)}
					<button
						onClick={() => {
							const rand = Math.floor(Math.random() * 9999);
							addItem({
								id: rand,
								name: "Item " + rand,
								price: 29.99,
								quantity: 1,
							});
						}}
					>
						Add Item
					</button>
					<button onClick={clearCart}>Clear Cart</button>

					<br />
					<h1>Total: {totalPrice}</h1>
				</Fragment>
			)}
		</div>
	);
}

function Skeleton({ className }: { className?: string }) {
	return (
		<div
			className={classNames(
				"cursor-pointer flex flex-col space-y-[46px] rounded-lg border border-gray-100 dark:border-white/2.5 bg-white dark:bg-white/1 p-6 shadow transition-all hover:shadow-md hover:dark:bg-white/2.5",
				className
			)}
		>
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
			<div className="flex items-center justify-start space-x-4 py-[4px]">
				<div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
				<div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-50/25" />
			</div>
		</div>
	);
}
