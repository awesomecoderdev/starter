"use client";
import React, { ChangeEvent, useState, Fragment } from "react";
import Dropzone from "@/components/settings/Dropzone";
import Country from "@/components/Country";
import BlurImage from "@/components/BlurImage";
import { LoadingDots } from "@/components/animation/Loading";
import { Button } from "@/components/Button";
import { classNames } from "@/utils/class";
import { getAvatarUrl, getSignature, saveToDatabase } from "@/utils/cloudinary";
import axios from "@/utils/axios";
import { plans } from "@/utils/plans";
import { toast } from "sonner";
import {
	Disclosure,
	Menu,
	RadioGroup,
	Switch,
	Transition,
} from "@headlessui/react";
import {
	MagnifyingGlassIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import {
	Bars3Icon,
	BellIcon,
	CogIcon,
	CreditCardIcon,
	KeyIcon,
	SquaresPlusIcon,
	UserCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Example from "./Example";
import Link from "next/link";

interface FormDataProps {
	name?: any;
	email?: any;
	avatar?: any;
	publicId?: any;
	street?: any;
	city?: any;
	region?: any;
	zip?: any;
	country?: any;
}

const GeneralSettings = ({ auth }: { auth?: any }) => {
	const [submitLoading, setSubmitLoading] = useState(false);
	const [avatar, setAvatar] = useState<any>(null);
	let [formData, setFormData] = useState<FormDataProps>({
		email: auth?.email,
	});

	const [selectedPlan, setSelectedPlan] = useState(plans[0]);
	const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handelGeneralSetting = async (e: any) => {
		e.preventDefault();

		if (Object.keys(formData).length == 1) {
			toast.error("Everything is up-to-date.");
			setSubmitLoading(false);
			return false;
		}

		try {
			axios
				.post("/api/auth/update", formData)
				.then((res) => {
					let req = res.data;
					if (req?.success) {
						setSubmitLoading(false);
						toast.success(
							req.message ?? "You have successfully logged in."
						);
					} else {
						setSubmitLoading(false);
						toast.error(req.message ?? "Something went wrong!");
						if (req.reload) {
							location.reload();
						}
					}
				})
				.catch((error) => {
					setSubmitLoading(false);
					toast.error(error.message ?? "Something went wrong!");
					if (error.response.status != 422) throw new Error(error);
				});
		} catch (error) {
			setSubmitLoading(false);
			toast.error("Something went wrong!");
		}
	};

	return (
		<form
			className="py-3 space-y-6"
			onSubmit={(e) => handelGeneralSetting(e)}
			encType="multipart/form-data"
		>
			<div className="relative space-y-12">
				<div className="md:grid lg:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h2 className="text-lg font-medium leading-6 p-0 m-0">
							Profile
						</h2>
						<p className="mt-1 text-sm ">
							This information will be shared with stripe so be
							careful what you share.
						</p>
					</div>
					<div className="md:col-span-2 md:mt-0 space-y-2">
						<div>
							<label className="block text-sm font-medium p-0 m-0">
								Avatar
							</label>
							<div className="flex items-center mt-1 space-x-5 ">
								<div className="relative h-12 w-12 overflow-hidden rounded-full">
									<BlurImage
										src={auth.avatar}
										alt={auth.name}
										width={100}
										height={100}
										onLoad={() => {
											URL.revokeObjectURL(auth.avatar);
										}}
										className="h-full w-full rounded-md object-cover p-0 m-0"
									/>
								</div>
								<Link
									href="/settings/profile"
									className="rounded-md border border-gray-300 dark:border-zinc-600 py-2 px-3 text-sm font-medium leading-4 shadow-sm hover:bg-gray-50 dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
								>
									Change
								</Link>
							</div>
						</div>

						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm font-medium "
								>
									Name
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="name"
									id="name"
									autoComplete="name"
									readOnly
									defaultValue={auth?.name ?? ""}
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="email"
									className="block text-sm font-medium "
								>
									Email address
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="email"
									id="email"
									defaultValue={auth?.email ?? ""}
									readOnly
									autoComplete="email"
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pointer-events-none"
								/>
							</div>

							<div className="col-span-6">
								<label
									htmlFor="street"
									className="block text-sm font-medium "
								>
									Street address
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="street"
									id="street"
									defaultValue={auth?.street ?? ""}
									autoComplete="street-address"
									readOnly
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-6 lg:col-span-2">
								<label
									htmlFor="city"
									className="block text-sm font-medium "
								>
									City
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="city"
									defaultValue={auth?.city ?? ""}
									id="city"
									autoComplete="address-level2"
									readOnly
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium "
								>
									State / Province
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									name="region"
									defaultValue={auth?.region ?? ""}
									id="region"
									autoComplete="address-level1"
									readOnly
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 lg:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium "
								>
									ZIP / Postal code
								</label>
								<input
									onChange={handleInputChange}
									type="text"
									defaultValue={auth?.zip ?? ""}
									name="zip"
									id="postal-code"
									autoComplete="postal-code"
									readOnly
									className="mt-1 block w-full rounded-md border-gray-300 dark:border-zinc-600 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									onChange={handleInputChange}
									id="country"
									name="country"
									autoComplete="country-name"
									readOnly
									defaultValue={
										auth.country
											? auth.country
											: "Palestine"
									}
									className="cursor-pointer mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-600 bg-transparent py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3 flex justify-end">
								<label
									htmlFor="submit"
									className="block text-sm font-medium pointer-events-none opacity-0"
								>
									Submit
								</label>
								<div className="flex justify-end items-end">
									<Button
										variant="outline"
										type="submit"
										id="submit"
										href="/settings/profile"
										className={classNames(
											"mt-1 text-sm font-medium min-h-[42px] shadow-sm flex items-center justify-center w-32 rounded-md p-2 transition-all duration-75 dark:text-white border-gray-300 dark:border-zinc-600"
										)}
									>
										Update
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative space-y-12 pt-6 ">
				<div className="md:grid lg:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<h2 className="text-lg font-medium leading-6 p-0 m-0">
							Pricing plans
						</h2>
						<p className="mt-1 text-sm ">
							This information of plans.
						</p>
					</div>
					<div className="md:col-span-2 md:mt-0">
						<RadioGroup
							value={selectedPlan}
							// onChange={setSelectedPlan}
						>
							<RadioGroup.Label className="sr-only">
								{" "}
								Pricing plans{" "}
							</RadioGroup.Label>
							<div className="relative -space-y-px rounded-lg bg-white">
								{plans.map((plan, planIdx) => (
									<RadioGroup.Option
										key={plan.name}
										value={plan}
										className={({ checked }) =>
											classNames(
												planIdx === 0
													? "rounded-tl-lg rounded-tr-lg"
													: "",
												planIdx === plans.length - 1
													? "rounded-bl-lg rounded-br-lg"
													: "",
												checked
													? "bg-primary-50 border-primary-200 z-10"
													: "border-gray-200",
												"relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none"
											)
										}
									>
										{({ active, checked }) => (
											<>
												<span className="flex items-center text-sm">
													<span
														className={classNames(
															"h-4 w-4 rounded-full border flex items-center justify-center pointer-events-none",
															checked
																? "bg-primary-500 border-transparent"
																: "bg-white border-gray-300"
															// active
															// 	? "ring-2 ring-offset-2 ring-primary-900"
															// 	: ""
														)}
														aria-hidden="true"
													>
														<span className="rounded-full bg-white w-1.5 h-1.5" />
													</span>
													<RadioGroup.Label
														as="span"
														className="ml-3 font-medium text-gray-900"
													>
														{plan.name}
													</RadioGroup.Label>
												</span>
												<RadioGroup.Description
													as="span"
													className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
												>
													<span
														className={classNames(
															checked
																? "text-primary-900"
																: "text-gray-900",
															"font-medium"
														)}
													>
														${plan.priceMonthly} /
														mo
													</span>{" "}
													<span
														className={
															checked
																? "text-primary-700"
																: "text-gray-500"
														}
													>
														($
														{plan.priceYearly} / yr)
													</span>
												</RadioGroup.Description>
												<RadioGroup.Description
													as="span"
													className={classNames(
														checked
															? "text-primary-700"
															: "text-gray-500",
														"ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
													)}
												>
													{plan.limit}
												</RadioGroup.Description>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<Button
					variant="outline"
					type="submit"
					href="/subscriptions"
					className={classNames(
						"text-sm font-medium min-h-[42px] flex items-center justify-center w-32 rounded-md p-2 transition-all duration-75 dark:text-white shadow-sm"
					)}
				>
					Update
				</Button>
			</div>
		</form>
	);
};

export default GeneralSettings;
