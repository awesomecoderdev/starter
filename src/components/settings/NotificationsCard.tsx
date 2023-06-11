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
				<div className="relative">
					<div className="lg:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<h2 className="text-lg font-medium leading-6 p-0 m-0">
								Notifications
							</h2>
							<p className="mt-1 text-sm p-0 m-0">
								Decide which communications you&apos;d like to
								receive and how.
							</p>
						</div>
						<div className="mt-5 space-y-6 md:col-span-2 ">
							<fieldset>
								<legend className="sr-only">Notices</legend>
								<div
									className="text-base font-medium p-0 m-0"
									aria-hidden="true"
								>
									Notices
								</div>
								<div className="mt-4 space-y-4">
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="login"
												name="login"
												type="checkbox"
												className="h-4 w-4 mt-1.5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="login"
												className="font-medium p-0 m-0 cursor-pointer"
											>
												Login Alert
											</label>
											<p className="text-gray-500 dark:text-zinc-400 p-0 m-0">
												Get notified when someones login
												into your account.
											</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="billing"
												name="billing"
												type="checkbox"
												className="h-4 w-4 mt-1.5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="billing"
												className="font-medium p-0 m-0 cursor-pointer"
											>
												Billing
											</label>
											<p className="text-gray-500 dark:text-zinc-400 p-0 m-0">
												Get notified when subscription
												updated.
											</p>
										</div>
									</div>
								</div>
							</fieldset>
							<fieldset>
								<legend className="contents text-base font-medium ">
									Newsletter
								</legend>
								<div className="mt-4 space-y-4">
									<div className="flex items-center">
										<input
											id="push-everything"
											name="newsletter"
											type="radio"
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-everything"
											className="ml-3 block text-sm font-medium p-0 m-0 cursor-pointer"
										>
											Everything
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="push-email"
											name="newsletter"
											type="radio"
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-email"
											className="ml-3 block text-sm font-medium p-0 m-0 cursor-pointer"
										>
											Weekly Updates
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="push-nothing"
											name="newsletter"
											type="radio"
											className="h-4 w-4 cursor-pointer border-gray-300 text-primary-600 focus:ring-primary-500"
										/>
										<label
											htmlFor="push-nothing"
											className="ml-3 block text-sm font-medium p-0 m-0 cursor-pointer"
										>
											No Notifications
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
