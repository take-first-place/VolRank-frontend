// utils/auth.js
export const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

export const isTokenExpired = (token) => {
    const decoded = decodeToken(token);

    if (!decoded?.exp) {
        return true
    };

    return decoded.exp * 1000 < Date.now();
};
