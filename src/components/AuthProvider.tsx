"use client";
import { remToPx } from "@/lib/remToPx";
import {
	AuthProviderProps,
	SectionProviderState,
	Section,
	UserSession,
} from "@/types";
import useNextAuth from "@/utils/auth";
import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { useStore, create } from "zustand";

const AuthUserContext = createContext([]);

const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? useEffect : useLayoutEffect;

export function AuthProvider({
	isSensitiveRoute,
	isAuthSensitiveRoute,
	session = null,
	children,
}: AuthProviderProps) {
	const [auth, setAuth] = useState<any>(session);
	let { error, user } = useNextAuth();

	if (!error && user) {
		setAuth(user);
	}

	let option: any = {
		auth,
		isSensitiveRoute,
		isAuthSensitiveRoute,
	} as {
		auth: object | null | undefined;
	};

	return (
		<AuthUserContext.Provider value={option}>
			{children}
		</AuthUserContext.Provider>
	);
}
export const useAuth = () => useContext<any>(AuthUserContext);
