"use client";
// import { Heading } from "@/components/Heading";
// import { Col, Note, Properties, Property, Row } from "@/components/Note";
// import { constructMetadata } from "@/utils/utils";
// import { Metadata } from "next";

// export const metadata: Metadata = constructMetadata({
// 	title: `Settings - ${process.env.APP_NAME}`,
// 	description: "Settings",
// });

// export default function Settings() {
// 	return (
// 		<>
// 			<h1>Errors :( </h1>
// 			<p className="lead">
// 				In this guide, we will talk about what happens when something
// 				goes wrong while you work with the API. Mistakes happen, and
// 				mostly they will be yours, not ours. Lets look at some status
// 				codes and error types you might encounter.
// 			</p>
// 			<p>
// 				You can tell if your request was successful by checking the
// 				status code when receiving an API response. If a response comes
// 				back unsuccessful, you can use the error type and error message
// 				to figure out what has gone wrong and do some rudimentary
// 				debugging (before contacting support).
// 			</p>
// 			<Note>
// 				Before reaching out to support with an error, please be aware
// 				that 99% of all reported errors are, in fact, user errors.
// 				Therefore, please carefully check your code before contacting
// 				Protocol support.
// 			</Note>
// 			<hr />
// 			<Heading level={2}>Status codes</Heading>
// 			<p>
// 				Here is a list of the different categories of status codes
// 				returned by the Protocol API. Use these to understand if a
// 				request was successful.
// 			</p>
// 			<Properties>
// 				<Property name="2xx">
// 					A 2xx status code indicates a successful response.
// 				</Property>
// 				<Property name="4xx">
// 					A 4xx status code indicates a client error — this means its
// 					a _you_ problem.
// 				</Property>
// 				<Property name="5xx">
// 					A 5xx status code indicates a server error — you wont be
// 					seeing these.
// 				</Property>
// 			</Properties>
// 			<hr />
// 			<Heading level={2}>Error types</Heading>
// 			<Row>
// 				<Col>
// 					Whenever a request is unsuccessful, the Protocol API will
// 					return an error response with an error type and message. You
// 					can use this information to understand better what has gone
// 					wrong and how to fix it. Most of the error messages are
// 					pretty helpful and actionable. Here is a list of the two
// 					error types supported by the Protocol API — use these to
// 					understand what you have done wrong.
// 					<Properties>
// 						<Property name="api_error">
// 							This means that we made an error, which is highly
// 							speculative and unlikely.
// 						</Property>
// 						<Property name="invalid_request">
// 							This means that you made an error, which is much
// 							more likely.
// 						</Property>
// 					</Properties>
// 				</Col>
// 				<Col>
// 					{/* ```bash {{ title: "Error response" }}
//     {
//       "type": "api_error",
//       "message": "No way this is happening!?",
//       "documentation_url": "https://protocol.chat/docs/errors/api_error"
//     }
//     ``` */}
// 				</Col>
// 			</Row>
// 		</>
// 	);
// }

/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
	return (
		<form className="space-y-6" action="#" method="POST">
			<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Profile
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							This information will be displayed publicly so be
							careful what you share.
						</p>
					</div>
					<div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
						<div className="grid grid-cols-3 gap-6">
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
										className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										placeholder="www.example.com"
									/>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700"
							>
								About
							</label>
							<div className="mt-1">
								<textarea
									id="about"
									name="about"
									rows={3}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="you@example.com"
									defaultValue={""}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								Brief description for your profile. URLs are
								hyperlinked.
							</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Photo
							</label>
							<div className="mt-1 flex items-center space-x-5">
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
									className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Change
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Cover photo
							</label>
							<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
								<div className="space-y-1 text-center">
									<svg
										className="mx-auto h-12 w-12 text-gray-400"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 48 48"
										aria-hidden="true"
									>
										<path
											d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<div className="flex text-sm text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs text-gray-500">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Personal Information
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Use a permanent address where you can receive mail.
						</p>
					</div>
					<div className="mt-5 md:col-span-2 md:mt-0">
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									Country
								</label>
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Notifications
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Decide which communications you'd like to receive
							and how.
						</p>
					</div>
					<div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
						<fieldset>
							<legend className="sr-only">By Email</legend>
							<div
								className="text-base font-medium text-gray-900"
								aria-hidden="true"
							>
								By Email
							</div>
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											id="comments"
											name="comments"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="comments"
											className="font-medium text-gray-700"
										>
											Comments
										</label>
										<p className="text-gray-500">
											Get notified when someones posts a
											comment on a posting.
										</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											id="candidates"
											name="candidates"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="candidates"
											className="font-medium text-gray-700"
										>
											Candidates
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											id="offers"
											name="offers"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="offers"
											className="font-medium text-gray-700"
										>
											Offers
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											accepts or rejects an offer.
										</p>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<legend className="contents text-base font-medium text-gray-900">
								Push Notifications
							</legend>
							<p className="text-sm text-gray-500">
								These are delivered via SMS to your mobile
								phone.
							</p>
							<div className="mt-4 space-y-4">
								<div className="flex items-center">
									<input
										id="push-everything"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label
										htmlFor="push-everything"
										className="ml-3 block text-sm font-medium text-gray-700"
									>
										Everything
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="push-email"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label
										htmlFor="push-email"
										className="ml-3 block text-sm font-medium text-gray-700"
									>
										Same as email
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="push-nothing"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label
										htmlFor="push-nothing"
										className="ml-3 block text-sm font-medium text-gray-700"
									>
										No push notifications
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="button"
					className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Save
				</button>
			</div>
		</form>
	);
}
