"use client";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { firebase } from "./firebase";
import axios from "./axios";
import { toast } from "sonner";

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
			axios
				.post("/api/auth/login", user)
				.then((res) => {
					toast.success("Successfully logged in!");
					location.reload();
				})
				.catch((error) => {
					// if (error.response.status != 422) throw new Error(error);
					toast.error(`Error: ${error.message}`);

					console.log(
						Object.values(error.response.data.errors).flat()
					);
				});
		}
	} catch (error: any) {
		toast.error(`Error: ${error.message}`);

		console.error("An error occured", error);
	}
};
