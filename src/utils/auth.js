import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);

    if (!decoded?.exp) {
        return true
    };

    return decoded.exp * 1000 < Date.now();
};
