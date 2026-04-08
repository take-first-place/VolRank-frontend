import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";

// JWT 디코딩
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(decoded);
      setIsLoggedIn(true);
      setIsAdmin(decoded?.role === "admin");
    } else {
      localStorage.removeItem("accessToken");
    }

    setLoading(false);
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("accessToken", token);
    const decoded = decodeToken(token);
    setUser(decoded);
    setIsLoggedIn(true);
    setIsAdmin(decoded?.role === "admin");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || isTokenExpired(token)) {
      logout();
      return null;
    }
    return token;
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isAdmin, loading, login, logout, getToken }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
