export const encode = (str: any) => Buffer.from(str).toString("base64");
export const decode = (str: any) =>
	Buffer.from(`${str}`, "base64").toString("ascii");

export const getUserFromCookie = (token?: any) => {
	if (token) {
		try {
			const session = JSON.parse(decode(`${token.split(".")[1]}`));
			if (session?.user?.email) {
				return session.user;
			}
		} catch (error) {
			// unauthorized
		}
	}
	return null;
};

export const getCartFromCookie = (token?: any) => {
	if (token) {
		try {
			const cart: any = JSON.parse(decode(`${token}`));
			return cart;
		} catch (error) {
			// unauthorized
		}
	}
	return null;
};
