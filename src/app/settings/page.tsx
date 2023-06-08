import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import Dropzone from "@/components/settings/Dropzone";
import { getUserFromCookie } from "@/utils/buffer";
import { constructMetadata } from "@/utils/utils";
import { cookies as getCookies } from "next/headers";
import { Metadata } from "next";
import Country from "@/components/Country";
import BlurImage from "@/components/BlurImage";

export const metadata: Metadata = constructMetadata({
	title: `Settings - ${process.env.APP_NAME}`,
	description: "Settings",
});

export default function Settings() {
	const cookies = getCookies();
	const token = cookies.get("token")?.value;
	const auth = getUserFromCookie(token);

	return (
		<form className="py-3 space-y-6" action="#" method="POST">
			<div className="px-4 py-5 shadow border border-zinc-900/7.5 dark:border-white/7.5 sm:rounded-lg sm:p-6">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h2 className="text-lg font-medium leading-6 p-0 m-0">
							Profile
						</h2>
						<p className="mt-1 text-sm ">
							This information will be displayed publicly so be
							careful what you share.
						</p>
					</div>
					<div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
						{/* <div className="grid grid-cols-3 gap-6">
							<div className="col-span-3 sm:col-span-2">
								<label
									htmlFor="company-website"
									className="block text-sm font-medium text-gray-700"
								>
									Website
								</label>
								<div className="mt-1 flex rounded-md shadow-sm">
									<span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
										http://
									</span>
									<input
										type="text"
										name="company-website"
										id="company-website"
										className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
										placeholder="www.example.com"
									/>
								</div>
							</div>
						</div> */}

						<div>
							<label className="block text-sm font-medium p-0 m-0">
								Avatar
							</label>
							{/* <div className="mt-1 flex items-center space-x-5">
								<span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
									<svg
										className="h-full w-full text-gray-300"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								</span>
								<button
									type="button"
									className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
								>
									Change
								</button>
							</div> */}
							<Dropzone auth={auth} />
						</div>

						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="first-name"
									className="block text-sm font-medium text-gray-700"
								>
									First name
								</label>
								<input
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="given-name"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="last-name"
									className="block text-sm font-medium text-gray-700"
								>
									Last name
								</label>
								<input
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="family-name"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-4">
								<label
									htmlFor="email-address"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<input
									type="text"
									name="email-address"
									id="email-address"
									autoComplete="email"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm font-medium"
								>
									Country
								</label>
								<Country
									id="country"
									name="country"
									autoComplete="country-name"
									defaultValue="Palestine"
									className="cursor-pointer mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6">
								<label
									htmlFor="street-address"
									className="block text-sm font-medium text-gray-700"
								>
									Street address
								</label>
								<input
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-6 lg:col-span-2">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700"
								>
									City
								</label>
								<input
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium text-gray-700"
								>
									State / Province
								</label>
								<input
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium text-gray-700"
								>
									ZIP / Postal code
								</label>
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="button"
					className="rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					Save
				</button>
			</div>
		</form>
	);
}
