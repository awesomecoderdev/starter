"use client";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import { LoadingDots } from "@/components/animation/Loading";
import { Prose } from "@/components/Prose";
import { toast } from "sonner";
import { Heading } from "@/components/Heading";

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
					toast.success("Invalid token or token has been expired.");
				}
			}
		}, 2000);
	}, [token, expired, loading]);

	return (
		<Prose>
			<div className="relative min-h-screen flex justify-center items-center flex-col space-y-4">
				<Heading level="3">Validating Token</Heading>
				{loading ? <LoadingDots /> : ""}
			</div>
		</Prose>
	);
};

export default MagicLogin;
