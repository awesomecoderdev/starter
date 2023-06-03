import React from "react";
import { Metadata } from "next";
import Badge from "@/components/Badge";
import Card from "@/components/websites/Card";

export const metadata: Metadata = {
	title: `Websites - ${process.env.APP_NAME}`,
	description: "Websites",
};

const getProducts = async () => {
	try {
		const req = await fetch("https://fakestoreapi.com/products");
		// await new Promise(function (resolve) {
		// 	setTimeout(resolve, 15000);
		// });
		const res = await req.json();
		return res;
	} catch (error) {
		return [];
	}
};

export default async function page() {
	const products = await getProducts();
	return (
		<>
			{products.map((product: any) => (
				<Card
					key={product.id}
					id={product.id}
					name={product.title}
					logo={product.image}
					href={`fakestoreapi.com/${product.id}`}
					endpoint={`https://fakestoreapi.com/`}
					status={product.id % 2 == 0 ? true : false}
				/>
			))}
		</>
	);
}
