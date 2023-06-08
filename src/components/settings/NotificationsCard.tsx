"use client";
import { classNames } from "@/utils/class";
import React, { Fragment, useState } from "react";
import { LoadingDots } from "@/components/animation/Loading";
import { Button } from "@/components/Button";

const NotificationsCard = () => {
	const [submitLoading, setSubmitLoading] = useState(false);

	const UpdateNotificationsSetting = async (data: any) => {
		console.log("data", data);
	};

	return (
		<Fragment>
			<form
				className="py-3 space-y-6"
				action={UpdateNotificationsSetting}
			>
				<div className="px-4 py-5 shadow border border-zinc-900/7.5 dark:border-white/7.5 sm:rounded-lg sm:p-6">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
								Notifications
							</h2>
							<p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
								Decide which communications you'd like to
								receive and how.
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
												className="h-4 w-4 mt-1.5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="comments"
												className="font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
											>
												Comments
											</label>
											<p className="text-gray-500 dark:text-zinc-400">
												Get notified when someones posts
												a comment on a posting.
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="candidates"
												name="candidates"
												type="checkbox"
												className="h-4 w-4 mt-1.5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="candidates"
												className="font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
											>
												Candidates
											</label>
											<p className="text-gray-500 dark:text-zinc-400">
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
												className="h-4 w-4 mt-1.5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="offers"
												className="font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
											>
												Offers
											</label>
											<p className="text-gray-500 dark:text-zinc-400">
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
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-everything"
											className="ml-3 block text-sm font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
										>
											Everything
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="push-email"
											name="push-notifications"
											type="radio"
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-email"
											className="ml-3 block text-sm font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
										>
											Same as email
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="push-nothing"
											name="push-notifications"
											type="radio"
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-nothing"
											className="ml-3 block text-sm font-medium text-gray-700 dark:text-zinc-50 cursor-pointer"
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
					<Button
						variant="outline"
						type="submit"
						onClick={() => setSubmitLoading(true)}
						disabled={submitLoading}
						className={classNames(
							"text-sm font-medium flex items-center justify-center w-32 rounded-md p-2 transition-all duration-75 ",
							submitLoading &&
								"justify-center min-h-[40px] pointer-events-none"
						)}
					>
						{submitLoading ? <LoadingDots /> : "Save Changes"}
					</Button>
				</div>
			</form>
		</Fragment>
	);
};

export default NotificationsCard;
