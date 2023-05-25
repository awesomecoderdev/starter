import { create } from "zustand";

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

const setItems = (items: Item[]) => {
	localStorage.setItem("session_id", btoa(`${JSON.stringify(items)}`));
};

const useCart = create<CartState>((set, get) => ({
	items: localStorage.getItem("session_id")
		? JSON.parse(atob(localStorage.getItem("session_id")!)) ?? [] ?? []
		: [],
	addItem: (item) =>
		set((state) => {
			let products = state.items.find((product) => product.id == item.id);
			if (products) {
				let items = state.items.map((i) => {
					if (i.id === item.id) {
						return { ...i, quantity: i.quantity + 1 };
					}
					return i;
				});
				setItems(items);
				return { items };
			} else {
				let items = [...state.items, { ...item, quantity: 1 }];
				setItems(items);
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
			setItems(items);
			return { items };
		}),
	decreaseQuantity: (itemId) =>
		set((state) => {
			let items = state.items.map((item) =>
				item.id === itemId
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
			setItems(items);
			return { items };
		}),
	removeItem: (itemId) =>
		set((state) => {
			let items = state.items.filter((item) => item.id !== itemId);
			setItems(items);
			return { items };
		}),
	clearCart: () =>
		set(() => {
			localStorage.removeItem("session_id");
			return { items: [] };
		}),
	getTotal: () => {
		let total = get()
			.items.reduce(
				(total: any, item: Item) => total + item.price * item.quantity,
				0
			)
			.toLocaleString("en-US", {
				style: "currency",
				currency: "EUR",
			});
		return total;
	},
}));

export default useCart;
