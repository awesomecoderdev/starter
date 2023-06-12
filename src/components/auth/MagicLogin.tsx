"use client";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import { LoadingCircle, LoadingDots } from "@/components/animation/Loading";
import { Prose } from "@/components/Prose";
import { toast } from "sonner";
import { Heading } from "@/components/Heading";
import BlurImage from "@/components/BlurImage";
import { Button } from "@/components/Button";
import { classNames } from "@/utils/class";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import {
	PageNotFoundAnimation,
	PaperPlaneAnimation,
} from "@/components/animation/Lottie";
interface MagicLoginProps {
	expired?: boolean;
	token?: any;
}
const MagicLogin = ({ token = null, expired = false }: MagicLoginProps) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			if (token) {
				if (!loading) {
					toast.success("You have successfully logged in.");
					Cookies.set("token", token);
					Cookies.remove("login_secret");
					setTimeout(() => {
						location.reload();
					}, 2000);
				}
			}
			if (!token && expired) {
				if (!loading) {
					Cookies.remove("login_secret");
					toast.error("Invalid token or token has been expired.");
				}
			}
		}, 2000);
	}, [token, expired, loading]);

	return (
		<Prose>
			<div className="relative lg:container flex min-h-[80vh] lg:my-10">
				<div
					className={classNames(
						"relative w-full px-5 sm:px-6 lg:px-8 lg:grid grid-cols-10 lg:border dark:border-zinc-600 rounded-md space-y-8 py-6 md:py-8"
					)}
				>
					<div className="relative lg:col-span-10 md:p-4 p-0 space-y-6">
						<div className="flex items-center justify-between mb-6">
							<Link href="/">
								<Logo className="w-32" />
							</Link>
							<div className="mr-4">
								<ModeToggle />
							</div>
						</div>
						{loading && (
							<Fragment>
								<div className="relative flex justify-center items-center min-h-[55vh]">
									<div>
										<div className="relative flex justify-center items-center">
											<LoadingCircle className="h-10 w-10" />
										</div>
										<div className="relative flex justify-center items-center">
											<Heading
												level="2"
												className="font-semibold text-xl mt-6"
											>
												Validating Token.
											</Heading>
										</div>
									</div>
								</div>
							</Fragment>
						)}

						{!loading && token && (
							<Fragment>
								<div className="relative flex justify-center items-center min-h-[55vh]">
									<div>
										<div className="relative flex justify-center items-center">
											<LoadingCircle className="h-10 w-10" />
										</div>
										<div className="relative flex justify-center items-center">
											<Heading
												level="2"
												className="font-semibold text-xl mt-6"
											>
												Please wait...
											</Heading>
										</div>
									</div>
								</div>
							</Fragment>
						)}

						{!loading && !token && (
							<Fragment>
								<div className="relative flex items-center justify-center">
									<PageNotFoundAnimation className="relative w-screen max-w-[16rem] mt-8" />
								</div>
								<div className="relative flex items-center justify-center">
									<Heading
										level="2"
										className="font-semibold md:text-3xl text-xl mt-10"
									>
										Your session has expired.
									</Heading>
								</div>
								<div className="relative flex items-center justify-center">
									<Button
										variant="outline"
										arrow="left"
										href="/login"
										className=" rounded-lg"
									>
										Go Back
									</Button>
								</div>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</Prose>
	);
};

export default MagicLogin;
