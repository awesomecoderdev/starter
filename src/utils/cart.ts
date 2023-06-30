import { create } from "zustand";
import Cookies from "js-cookie";
import { getCartFromCookie } from "./buffer";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface Item {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface CartState {
	items: Item[];
	addItem: (item: Item) => void;
	increaseQuantity: (itemId: number) => void;
	decreaseQuantity: (itemId: number) => void;
	removeItem: (itemId: number) => void;
	clearCart: () => void;
	getTotal: () => string;
}

const btoa = (str: string) => {
	return Buffer.from(str).toString("base64");
};

const atob = (str: string) => {
	return Buffer.from(str, "base64").toString("ascii");
};

const setItems = (items: Item[]) => {
	window.localStorage.setItem("session_id", btoa(`${JSON.stringify(items)}`));
	Cookies.set("session_id", btoa(`${JSON.stringify(items)}`));
};

const useCart = create(
	persist<CartState>(
		(set, get) => ({
			items: [],
			addItem: (item) =>
				set((state) => {
					let products = state.items.find(
						(product) => product.id == item.id
					);
					if (products) {
						let items = state.items.map((i) => {
							if (i.id === item.id) {
								return { ...i, quantity: i.quantity + 1 };
							}
							return i;
						});
						// setItems(items);
						return { items };
					} else {
						let items = [...state.items, { ...item, quantity: 1 }];
						// setItems(items);
						return { items };
					}
				}),
			increaseQuantity: (itemId) =>
				set((state) => {
					let items = state.items.map((item) =>
						item.id === itemId
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
					// setItems(items);
					return { items };
				}),
			decreaseQuantity: (itemId) =>
				set((state) => {
					let items = state.items.map((item) =>
						item.id === itemId
							? { ...item, quantity: item.quantity - 1 }
							: item
					);
					// setItems(items);
					return { items };
				}),
			removeItem: (itemId) =>
				set((state) => {
					let items = state.items.filter(
						(item) => item.id !== itemId
					);
					// setItems(items);
					return { items };
				}),
			clearCart: () =>
				set(() => {
					window.localStorage.removeItem("session_id");
					return { items: [] };
				}),
			getTotal: () => {
				let total = get()
					.items.reduce(
						(total: any, item: Item) =>
							total + item.price * item.quantity,
						0
					)
					.toLocaleString("en-US", {
						style: "currency",
						currency: "EUR",
					});
				return total;
			},
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCart;
