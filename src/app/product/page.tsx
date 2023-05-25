"use client";
import useCart from "@/utils/cart";

export default function Product() {
	const items = useCart((state) => state.items);
	const addItem = useCart((state) => state.addItem);
	const removeItem = useCart((state) => state.removeItem);
	const clearCart = useCart((state) => state.clearCart);
	const totalPrice = useCart((state) => state.getTotal());

	return (
		<div>
			<h2>Cart</h2>
			{items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div>
					{items?.map((item: any) => (
						<div key={item.id}>
							{item.name} - ${item.price}
							<strong>{JSON.stringify(item, null, 2)}</strong>
							<button onClick={() => removeItem(item.id)}>
								Remove
							</button>
						</div>
					))}
				</div>
			)}
			<button
				onClick={() =>
					addItem({
						id: 2,
						name: "Item 2",
						price: 29.99,
						quantity: 1,
					})
				}
			>
				Add Item
			</button>
			<button onClick={clearCart}>Clear Cart</button>

			<br />
			<h1>Total: {totalPrice}</h1>
		</div>
	);
}
