"use client";
import Cookies from "js-cookie";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { LoadingDots } from "@/components/animation/Loading";
import { Logo } from "@/components/Logo";
import { Prose } from "@/components/Prose";
import { toast } from "sonner";
import { Heading } from "@/components/Heading";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Country from "@/components/Country";
import BlurImage from "@/components/BlurImage";
import { Button } from "@/components/Button";
import { classNames } from "@/utils/class";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import axios from "@/utils/axios";
interface MagicRegisterProps {
	expired?: boolean;
	token?: any;
	user?: any;
}

interface FormDataProps {
	name?: any;
	email?: any;
	street?: any;
	city?: any;
	region?: any;
	zip?: any;
	country?: any;
	secret?: any;
}

const MagicRegister = ({
	token = null,
	expired = false,
	user = null,
}: MagicRegisterProps) => {
	const [loading, setLoading] = useState(false);
	const [steps, setSteps] = useState([
		{ name: "Create account", status: "complete" },
		{ name: "Profile information", status: "current" },
		{ name: "Complete", status: "upcoming" },
	]);
	let userData = user ?? {};
	let [formData, setFormData] = useState<FormDataProps>(userData);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		setFormData({
			...formData,
			secret: token,
		});
	}, []);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 		if (token) {
	// 			if (!loading) {
	// 				toast.success("You have successfully logged in.");
	// 				Cookies.set("token", token);
	// 				Cookies.remove("login_secret");
	// 				setTimeout(() => {
	// 					location.reload();
	// 				}, 2000);
	// 			}
	// 		}

	// 		if (!token && expired) {
	// 			if (!loading) {
	// 				Cookies.remove("login_secret");
	// 				toast.error("Invalid token or token has been expired.");
	// 			}
	// 		}
	// 	}, 2000);
	// }, [token, expired, loading]);

	const handelCreateAccount = async (e: any) => {
		e.preventDefault();

		if (Object.keys(formData).length == 1) {
			toast.error("Everything is up-to-date.");
			setLoading(false);
			return false;
		}

		try {
			axios
				.post("/api/auth/register", formData)
				.then((res) => {
					let req = res.data;
					if (req?.success) {
						setLoading(false);
						toast.success(
							req.message ?? "You have successfully logged in."
						);
						Cookies.remove("signup_secret");
						location.reload();
					} else {
						setLoading(false);
						toast.error(req.message ?? "Something went wrong!");
					}
				})
				.catch((error) => {
					setLoading(false);
					toast.error(error.message ?? "Something went wrong!");
					if (error.response.status != 422) throw new Error(error);
				});
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong!");
		}
	};

	return (
		<Prose>
			<div className="relative lg:container flex min-h-[80vh] lg:my-10">
				<div className="relative w-full py-8 md:py-12 px-5 sm:px-6 lg:px-8 lg:grid grid-cols-10 lg:border rounded-md space-y-8">
					<div className="relative lg:col-span-2 md:p-4 p-0 lg:border-r">
						<div className="flex items-center justify-between mb-6">
							<Link href="/">
								<Logo className="w-32" />
							</Link>
							<div className="mr-4">
								<ModeToggle />
							</div>
						</div>
						<nav
							className="flex justify-start"
							aria-label="Progress"
						>
							<ol role="list" className="space-y-6">
								{steps.map((step) => (
									<li key={step.name}>
										{step.status === "complete" ? (
											<button className="group">
												<span className="flex items-center">
													<span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
														<CheckCircleIcon
															className="h-full w-full text-primary-600 group-hover:scale-110 transition-all"
															aria-hidden="true"
														/>
													</span>
													<span className="transition-all ml-3 text-sm font-semibold group-hover:text-zinc-700 dark:group-hover:text-white">
														{step.name}
													</span>
												</span>
											</button>
										) : step.status === "current" ? (
											<button
												className="flex items-center"
												aria-current="step"
											>
												<span
													className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
													aria-hidden="true"
												>
													<span className="absolute h-4 w-4 rounded-full bg-primary-200 animate-ping" />
													<span className="absolute h-4 w-4 rounded-full bg-primary-200 dark:bg-primary-400" />
													<span className="relative block h-2 w-2 rounded-full bg-primary-600" />
												</span>
												<span className=" transition-all ml-3 text-sm font-semibold text-primary-600 dark:text-white">
													{step.name}
												</span>
											</button>
										) : (
											<button className="group">
												<div className="flex items-center">
													<div
														className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
														aria-hidden="true"
													>
														<div className="h-2 w-2 rounded-full bg-gray-300 group-hover:scale-110 transition-all" />
													</div>
													<p className="transition-all ml-3 text-sm font-semibold group-hover:text-zinc-700 dark:group-hover:text-white">
														{step.name}
													</p>
												</div>
											</button>
										)}
									</li>
								))}
							</ol>
						</nav>
					</div>
					<div className="relative lg:col-span-8 lg:px-10 flex justify-center">
						<div className="relative grid grid-cols-6 gap-6">
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
									defaultValue={formData?.name}
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									type="text"
									name="email"
									id="email"
									defaultValue={user?.email}
									readOnly
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pointer-events-none"
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
									defaultValue={formData?.street}
									autoComplete="street-address"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									defaultValue={formData?.city}
									id="city"
									autoComplete="address-level2"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									defaultValue={formData?.region}
									id="region"
									autoComplete="address-level1"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									defaultValue={formData?.zip}
									name="zip"
									id="postal-code"
									autoComplete="postal-code"
									className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
									defaultValue={
										formData.country
											? formData.country
											: "Palestine"
									}
									className="cursor-pointer mt-1 block w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="submit"
									className="block text-sm font-medium pointer-events-none opacity-0"
								>
									Submit
								</label>
								<div className="flex justify-end  mt-1 ">
									<Button
										variant="outline"
										id="submit"
										type="submit"
										onClick={handelCreateAccount}
										className={classNames(
											"text-sm font-medium flex items-center justify-center w-32 rounded-md p-2 transition-all duration-75 dark:text-white border-gray-300 min-h-[42px]",
											loading &&
												"justify-center  pointer-events-none"
										)}
									>
										{loading ? <LoadingDots /> : "Complete"}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Prose>
	);
};

export default MagicRegister;
