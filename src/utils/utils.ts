import ms from "ms";
import { Metadata } from "next";
import { customAlphabet } from "nanoid";

export function constructMetadata({
	title = "Wp Plagiarism - AI Plagiarism checker for WordPress",
	description = "Wp Plagiarism is an AI Plagiarism checker for content writers / bloggers to check and track plagiarisms of WordPress websites.",
	image = "https://awesomecoder.dev/img/profile.jpg",
}: {
	title?: string;
	description?: string;
	image?: string;
}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@awesomecoderdev",
		},
		metadataBase: new URL("https://awesomecoder.dev"),
		themeColor: "#FFF",
	};
}

export const nanoid = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	25
); // 7-character random string

interface SWRError extends Error {
	status: number;
}

export async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);

	if (!res.ok) {
		const error = await res.text();
		const err = new Error(error) as SWRError;
		err.status = res.status;
		throw err;
	}

	return res.json();
}

export function nFormatter(num?: number, digits?: number) {
	if (!num) return "0";
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "K" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value;
		});
	return item
		? (num / item.value).toFixed(digits || 1).replace(rx, "$1") +
				item.symbol
		: "0";
}

export const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export function capitalize(str: string) {
	if (!str || typeof str !== "string") return str;
	if (isValidDomain(str)) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidDomain(domain: string) {
	try {
		var domainPattern = /^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/;
		return domainPattern.test(domain);
	} catch (error) {
		return false;
	}
}

export const chunk = <T>(array: T[], chunk_size: number): T[][] => {
	return array.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / chunk_size);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = []; // start a new chunk
		}

		resultArray[chunkIndex].push(item);

		return resultArray;
	}, [] as T[][]);
};

export const timeAgo = (timestamp?: Date, timeOnly?: boolean): string => {
	if (!timestamp) return "never";
	return `${ms(Date.now() - new Date(timestamp).getTime())}${
		timeOnly ? "" : " ago"
	}`;
};

export const getDateTimeLocal = (timestamp?: Date): string => {
	const d = timestamp ? new Date(timestamp) : new Date();
	if (d.toString() === "Invalid Date") return "";
	return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
		.toISOString()
		.split(":")
		.slice(0, 2)
		.join(":");
};

export const formatDate = (dateString: string) => {
	return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
};

export const getFirstAndLastDay = (day: number) => {
	const today = new Date();
	const currentDay = today.getDate();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();
	if (currentDay >= day) {
		// if the current day is greater than target day, it means that we just passed it
		return {
			firstDay: new Date(currentYear, currentMonth, day),
			lastDay: new Date(currentYear, currentMonth + 1, day - 1),
		};
	} else {
		// if the current day is less than target day, it means that we haven't passed it yet
		const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear; // if the current month is January, we need to go back a year
		const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // if the current month is January, we need to go back to December
		return {
			firstDay: new Date(lastYear, lastMonth, day),
			lastDay: new Date(currentYear, currentMonth, day - 1),
		};
	}
};

// courtesy of ChatGPT: https://sharegpt.com/c/pUYXtRs
export const validDomainRegex = new RegExp(
	/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);

export const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/);

export const getSubdomain = (name: string, apexName: string) => {
	if (name === apexName) return null;
	return name.slice(0, name.length - apexName.length - 1);
};

export const isValidUrl = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
};

export const getDomain = (headers: Headers) => {
	let domain = headers.get("host") as string;
	return domain;
};

type LocationProps = {
	href?: any;
	protocol?: any;
	host?: any;
	hostname?: any;
	port?: any;
	pathname?: any;
	search?: any;
	hash?: any;
};
export function getLocation(href: string): LocationProps {
	try {
		let match: any = href.match(
			/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
		);

		if (match) {
			return {
				href: href,
				protocol: match[1],
				host: match[2],
				hostname: match[3],
				port: match[4],
				pathname: match[5],
				search: match[6],
				hash: match[7],
			};
		}
	} catch (error) {
		// nothing
	}

	return {
		href: null,
		protocol: null,
		host: null,
		hostname: null,
		port: null,
		pathname: null,
		search: null,
		hash: null,
	};
}

export const getUrlFromString = (str: string) => {
	if (isValidUrl(str)) return str;
	try {
		if (str.includes(".") && !str.includes(" ")) {
			return new URL(`https://${str}`).toString();
		}
	} catch (e) {
		return null;
	}
};

export const getDomainWithoutWWW = (url: string) => {
	if (isValidUrl(url)) {
		return new URL(url).hostname.replace(/^www\./, "");
	}
	try {
		if (url.includes(".") && !url.includes(" ")) {
			return new URL(`https://${url}`).hostname.replace(/^www\./, "");
		}
	} catch (e) {
		return null;
	}
};

export const truncate = (str: string | null, length: number) => {
	if (!str || str.length <= length) return str;
	return `${str.slice(0, length - 3)}...`;
};

export const constructURLFromUTMParams = (
	url: string,
	utmParams: Record<string, string>
) => {
	if (!url) return "";
	try {
		const newURL = new URL(url);
		for (const [key, value] of Object.entries(utmParams)) {
			if (value === "") {
				newURL.searchParams.delete(key);
			} else {
				newURL.searchParams.set(key, value);
			}
		}
		return newURL.toString();
	} catch (e) {
		return "";
	}
};

export const paramsMetadata = [
	{ display: "Referral (ref)", key: "ref", examples: "twitter, facebook" },
	{ display: "UTM Source", key: "utm_source", examples: "twitter, facebook" },
	{ display: "UTM Medium", key: "utm_medium", examples: "social, email" },
	{ display: "UTM Campaign", key: "utm_campaign", examples: "summer_sale" },
	{ display: "UTM Term", key: "utm_term", examples: "blue_shoes" },
	{ display: "UTM Content", key: "utm_content", examples: "logolink" },
];

export const getUrlWithoutUTMParams = (url: string) => {
	try {
		const newURL = new URL(url);
		paramsMetadata.forEach((param) =>
			newURL.searchParams.delete(param.key)
		);
		return newURL.toString();
	} catch (e) {
		return url;
	}
};

export async function generateMD5Hash(message: any) {
	// Convert the message string to a Uint8Array
	const encoder = new TextEncoder();
	const data = encoder.encode(message);

	// Generate the hash using the SubtleCrypto interface
	const hashBuffer = await crypto.subtle.digest("MD5", data);

	// Convert the hash to a hexadecimal string
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");

	return hashHex;
}

const logTypeToEnv = {
	cron: process.env.DUB_SLACK_HOOK_CRON,
	links: process.env.DUB_SLACK_HOOK_LINKS,
	error: process.env.DUB_SLACK_HOOK_ERROR,
};

export const log = async (
	message: string,
	type: "cron" | "links" | "error",
	mention?: boolean
) => {
	/* Log a message to the console */
	const HOOK = logTypeToEnv[type];
	if (!HOOK) return;
	try {
		return await fetch(HOOK, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: `${
								mention ? "<@U0404G6J3NJ> " : ""
							}${message}`,
						},
					},
				],
			}),
		});
	} catch (e) {
		console.log(`Failed to log to Dub Slack. Error: ${e}`);
	}
};

export const getAppUrl = (path?: string) => {
	const base = process.env.APP_URL ?? "";
	if (!path) {
		return base;
	}

	return `${base}${path}`;
};

export const jwtSecret = process.env.JWT_SECRET ?? "";
