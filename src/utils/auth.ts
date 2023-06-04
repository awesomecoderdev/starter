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
			return await axios
				.post("/api/auth/login", user)
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					if (error.response.status != 422) throw new Error(error);
				});
		}
	} catch (error: any) {
		if (error.response.status != 422) throw new Error(error);
	}
	return null;
};
