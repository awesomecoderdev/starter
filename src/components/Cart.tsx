"use client";
import useCart from "@/utils/cart";

export default function Cart({ cart }: { cart: any }) {
	let { items, addItem, removeItem, clearCart, getTotal } = useCart();
	// if (items?.length == 0) {
	// 	items = cart;
	// }
	const totalPrice = getTotal();

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
