/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		fontSize: {
			"2xs": ["0.75rem", { lineHeight: "1.25rem" }],
			xs: ["0.8125rem", { lineHeight: "1.5rem" }],
			sm: ["0.875rem", { lineHeight: "1.5rem" }],
			base: ["1rem", { lineHeight: "1.75rem" }],
			lg: ["1.125rem", { lineHeight: "1.75rem" }],
			xl: ["1.25rem", { lineHeight: "1.75rem" }],
			"2xl": ["1.5rem", { lineHeight: "2rem" }],
			"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
			"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
			"5xl": ["3rem", { lineHeight: "1" }],
			"6xl": ["3.75rem", { lineHeight: "1" }],
			"7xl": ["4.5rem", { lineHeight: "1" }],
			"8xl": ["6rem", { lineHeight: "1" }],
			"9xl": ["8rem", { lineHeight: "1" }],
		},
		typography: require("./typography"),
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				glow: "0 0 4px rgb(0 0 0 / 0.1)",
			},
			maxWidth: {
				lg: "33rem",
				"2xl": "40rem",
				"3xl": "50rem",
				"5xl": "66rem",
			},
			opacity: {
				1: "0.01",
				2.5: "0.025",
				7.5: "0.075",
				15: "0.15",
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "2rem",
					xl: "2rem",
					"2xl": "2rem",
				},
			},
			colors: {
				primary: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
				},
				// primary: {
				// 	50: "#eef2ff",
				// 	100: "#e0e7ff",
				// 	200: "#c7d2fe",
				// 	300: "#a5b4fc",
				// 	400: "#818cf8",
				// 	500: "#6366f1",
				// 	600: "#4f46e5",
				// 	700: "#4338ca",
				// 	800: "#3730a3",
				// 	900: "#312e81",
				// },
				// primary: {
				// 	50: "#fdf4ff",
				// 	100: "#fae8ff",
				// 	200: "#f5d0fe",
				// 	300: "#f0abfc",
				// 	400: "#e879f9",
				// 	500: "#d946ef",
				// 	600: "#c026d3",
				// 	700: "#a21caf",
				// 	800: "#86198f",
				// 	900: "#701a75",
				// 	950: "#4a044e",
				// },
			},
			fontFamily: {
				poppins: "'Poppins', sans-serif",
				roboto: "'Roboto', sans-serif",
				roboto: "'Roboto', sans-serif",
				inter: "'Inter', sans-serif",
				primary:
					"Euclid Circular A,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
			},
		},
	},
	variants: {
		extend: {
			visibility: ["group-hover"],
			display: ["group-hover"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
