"use client";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { firebase } from "./firebase";
import axios from "./axios";
import { toast } from "sonner";
import useSWR from "swr";

interface AuthUserContextType {
	Provider: any;
}

interface CurrentAuthContextType {
	user: any;
}

type Props = {
	children: React.ReactNode;
	cookie: object | any;
};

const Provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const { user } = await signInWithPopup(firebase, Provider);
		const { email } = user;
		if (user && email) {
			return await axios
				.post("/api/auth/login", user)
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					console.log("error", error);
					if (error.response.status != 422) throw new Error(error);
				});
		}
	} catch (error: any) {
		console.log("error", error);

		if (error.response.status != 422) throw new Error(error);
	}
	return null;
};

export const signUpWithGoogle = async () => {
	try {
		const { user } = await signInWithPopup(firebase, Provider);
		const { email } = user;
		if (user && email) {
			return await axios
				.post("/api/auth/register", user)
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					console.log("error", error);
					if (error.response.status != 422) throw new Error(error);
				});
		}
	} catch (error: any) {
		console.log("error", error);

		if (error.response.status != 422) throw new Error(error);
	}
	return null;
};

export default function useNextAuth() {
	// const {
	// 	data: user,
	// 	error,
	// 	mutate,
	// }: {
	// 	data: any;
	// 	error: any;
	// 	mutate: any;
	// } = useSWR(
	// 	"/api/auth/session",
	// 	() =>
	// 		axios
	// 			.post("/api/auth/session")
	// 			.then((response) => response.data.data.user),
	// 	{
	// 		dedupingInterval: 30000,
	// 	}
	// );

	let error,
		user = null;

	return {
		error,
		user,
	};
}
