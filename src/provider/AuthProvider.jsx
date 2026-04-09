import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { isTokenExpired } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { loginUser, signupUser, sendCode, verifyEmailCode } from "../api/auth";

const isAdminRole = (role) => String(role || "").toUpperCase() === "ADMIN";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      const decoded = jwtDecode(token);

      setUser(decoded);
      setIsLoggedIn(true);
      setIsAdmin(isAdminRole(decoded?.role));
    } else {
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (loginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(loginData);
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser(user);
      setIsLoggedIn(true);
      setIsAdmin(isAdminRole(user?.role));

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "로그인 실패";
      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (signupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signupUser(signupData);

      if (response.data.success === false) {
        setError(response.data.message);

        return {
          success: false,
          error: response.data.message,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      const message = err.response?.data?.message || "회원가입 실패";
      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendVerificationCode = useCallback(async (email) => {
    setIsLoading(true);

    try {
      const response = await sendCode(email);

      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (err) {
      const message = err.response?.data?.message || "인증번호 전송 실패";
      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifiedEmailCode = useCallback(async (email, code) => {
    setIsLoading(true);

    try {
      const response = await verifyEmailCode(email, code);

      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (err) {
      const message = err.response?.data?.message || "인증 실패";
      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout();
      return null;
    }

    return token;
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        loading,
        isLoading,
        error,
        login,
        logout,
        signup,
        sendVerificationCode,
        verifiedEmailCode,
        getToken,
        clearError,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
