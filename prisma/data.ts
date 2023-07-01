// `id`, `name`, `stripe_price`, `price`, `type`, `websites`, `posts`, `metadata`, `created_at`, `updated_at`

export const plans = [
	{
		name: "Enterprise",
		stripe_price: "price_1NIdLOIX4CRni5u3Ll19wEya",
		price: 249,
		type: "monthly",
		websites: 10,
		posts: 150,
		metadata: null,
	},
	{
		name: "Business",
		stripe_price: "price_1NIdKtIX4CRni5u30WEc2c8I",
		price: 99,
		type: "monthly",
		websites: 5,
		posts: 100,
		metadata: null,
	},
	{
		name: "Startup",
		stripe_price: "price_1NIdKDIX4CRni5u33vxRuoO7",
		price: 29,
		type: "monthly",
		websites: 1,
		posts: 50,
		metadata: null,
	},

	{
		name: "Startup Yearly",
		stripe_price: "price_1NMVNEIX4CRni5u3Eg559Yvg",
		price: 319,
		type: "yearly",
		websites: 1,
		posts: 50,
		metadata: null,
	},

	{
		name: "Business Yearly",
		stripe_price: "price_1NMVP2IX4CRni5u3vfsZBacT",
		price: 999,
		type: "yearly",
		websites: 5,
		posts: 100,
		metadata: null,
	},

	{
		name: "Enterprise Yearly",
		stripe_price: "price_1NMVQWIX4CRni5u3nn2SLHB4",
		price: 2499,
		type: "yearly",
		websites: 10,
		posts: 150,
		metadata: null,
	},
];

module.exports = {
	plans,
};
