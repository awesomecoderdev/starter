"use client";
import { Logo } from "@/components/Logo";
import { Prose } from "@/components/Prose";
import { signUpWithGoogle } from "@/utils/auth";
import { classNames } from "@/utils/class";
import { useState } from "react";
import { LoadingDots } from "@/components/animation/Loading";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { ModeToggle } from "@/components/ModeToggle";
import { toast } from "sonner";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import axios from "@/utils/axios";
import MagicRegister from "@/components/auth/MagicRegister";

interface SignUpCardProps {
	signup?: any;
	expired?: boolean;
	token?: any;
	user?: any;
}
const SignUpCard = ({
	token = null,
	signup = false,
	expired = false,
	user = null,
}: SignUpCardProps) => {
	const [googleLoading, setGoogleLoading] = useState(false);
	const [emailLoading, setEmailLoading] = useState(false);
	const [email, setEmail] = useState("");

	if (signup) {
		return <MagicRegister token={token} user={user} expired={expired} />;
	}

	const SignUp = async () => {
		setGoogleLoading(true);
		try {
			const req = await signUpWithGoogle();
			if (req?.success) {
				toast.success(
					req.message ?? "You have successfully logged in."
				);
				location.reload();
			} else {
				setGoogleLoading(false);
				toast.error(req.message ?? "Something went wrong!");
			}
		} catch (error) {
			setGoogleLoading(false);
			toast.error("Something went wrong!");
		}
	};

	const SignUpWithEmail = async () => {
		if (email == "") {
			toast.error("Email can't be empty!");
			return false;
		}
		setEmailLoading(true);
		try {
			const req: any = await axios
				.post("/api/auth/register", { email: email })
				.then((res) => res.data)
				.catch((err) => ({ success: false, message: err?.message }));

			if (req?.success) {
				toast.success(req.message);
			} else {
				toast.error(req.message ?? "Something went wrong!");
			}
			setEmailLoading(false);
		} catch (error) {
			setEmailLoading(false);
			toast.error("Something went wrong!");
		}
	};

	return (
		<div className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<div
					className="hidden bg-cover lg:block lg:w-2/3"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
					}}
				>
					<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
						<div>
							<h2 className="text-2xl font-bold text-white sm:text-3xl">
								Plagiarism AI
							</h2>

							<p className="max-w-xl mt-3 text-gray-300">
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. In autem ipsa, nulla
								laboriosam dolores, repellendus perferendis
								libero suscipit nam temporibus molestiae
							</p>
						</div>
					</div>
				</div>

				<Prose className="relative flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
					<Button
						variant="outline"
						arrow="left"
						href="/"
						className="absolute lg:left-10 left-6 top-10 rounded-lg"
					>
						Back
					</Button>
					<div className="absolute lg:right-10 right-6 top-10 rounded-lg bg-zinc-50 dark:bg-zinc-600/30">
						<ModeToggle />
					</div>

					<div className="flex-1">
						<div className="text-center">
							<div className="flex justify-center mx-auto">
								<Logo className="w-32" />
							</div>
						</div>

						<div className="mt-8">
							<div className="mt-6">
								<Button
									variant="secondary"
									disabled={emailLoading}
									onClick={SignUp}
									className={classNames(
										"text-sm font-medium flex items-center justify-center w-full rounded-lg p-2 transition-all duration-75 ",
										googleLoading &&
											"justify-center bg-gray-100 dark:bg-zinc-700/[0.30] min-h-[40px]",
										emailLoading && "pointer-events-none"
									)}
								>
									{googleLoading ? (
										<LoadingDots />
									) : (
										<>
											<svg
												className="w-4 h-4 mx-2 pointer-events-none"
												viewBox="0 0 40 40"
											>
												<path
													d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
													fill="#FFC107"
												></path>
												<path
													d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
													fill="#FF3D00"
												></path>
												<path
													d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
													fill="#4CAF50"
												></path>
												<path
													d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
													fill="#1976D2"
												></path>
											</svg>
											Sign up with Google
										</>
									)}
								</Button>
							</div>
							<div className="flex items-center justify-between mt-4">
								<span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

								<span className="text-xs font-semibold text-center text-gray-500 capitalize dark:text-gray-400 hover:underline">
									or create account with email
								</span>

								<span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
							</div>

							<div className="mt-6">
								<input
									type="email"
									name="email"
									id="email"
									placeholder="example@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring focus:ring-opacity-40"
								/>
							</div>

							<div className="mt-6">
								<Button
									variant="primary"
									onClick={SignUpWithEmail}
									disabled={googleLoading}
									className={classNames(
										"text-sm font-medium flex items-center justify-center w-full rounded-lg p-2 transition-all duration-75 ",
										emailLoading &&
											"justify-center min-h-[40px] pointer-events-none"
									)}
								>
									{emailLoading ? (
										<LoadingDots className="bg-white" />
									) : (
										"Sign up with Email"
									)}
								</Button>
							</div>

							<p className="mt-6 text-sm text-center text-gray-400">
								Already have an account?{" "}
								<Link
									href="/login"
									className="text-primary-500 focus:outline-none focus:underline hover:underline"
								>
									Sign in
								</Link>
								.
							</p>
						</div>
					</div>
				</Prose>
			</div>
		</div>
	);
};

export default SignUpCard;
