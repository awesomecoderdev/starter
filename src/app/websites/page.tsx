import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Websites - ${process.env.APP_NAME}`,
	description: "Websites",
};

const getProducts = async () => {
	const req = await fetch("https://fakestoreapi.com/products");
	const res = await req.json();
	return res;
};

export default async function page() {
	const products = await getProducts();
	return (
		<>
			<h1>Websites</h1>
			<div className="mt-6 grid grid-cols-fluid gap-x-8 gap-y-8 sm:gap-y-10 ">
				{products.map((product: any) => (
					<div
						key={product.id}
						className="group relative shadow p-4 border rounded-md border-zinc-900/5 dark:border-white/5 bg-white"
					>
						<div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-lg bg-gray-100">
						<picture>
							<img
								src={product.image}
								alt={product.title}
								className="object-cover object-center p-0 m-0"
							/>
							   </picture>
							<div
								className="flex items-end p-4 opacity-0 group-hover:opacity-100"
								aria-hidden="true"
							>
								<div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
									View Product
								</div>
							</div>
						</div>
						<div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
							<h3>
								<a href="#">
									<span
										aria-hidden="true"
										className="absolute inset-0"
									/>
									{product.name}
								</a>
							</h3>
							<p>{product.price}</p>
						</div>
						<p className="mt-1 text-sm text-gray-500">
							{product.category}
						</p>
					</div>
				))}
			</div>
		</>
	);
}
