import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { decodeToken, isTokenExpired } from "../utils/auth";
import { loginUser, signupUser, sendCode, verifyEmailCode } from "../api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 초기 토큰 체크 (기존과 동일)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      setUser(decoded);
      setIsLoggedIn(true);
      setIsAdmin(decoded?.role === "admin");
    } else {
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  // 로그인: API 함수 사용
  const login = useCallback(async (loginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(loginData); // ← API 함수 호출
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user?.role === "admin");

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

  // 회원가입: API 함수 사용
  const signup = useCallback(async (signupData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signupUser(signupData); // ← API 함수 호출

      if (response.data.success === false) {
        setError(response.data.message);
        return { success: false, error: response.data.message };
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

  // 인증번호 전송: API 함수 사용
  const sendVerificationCode = useCallback(async (email) => {
    setIsLoading(true);
    try {
      const response = await sendCode(email); // ← API 함수 호출

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

  // 인증번호 확인: API 함수 사용
  const verifiedEmailCode = useCallback(async (email, code) => {
    setIsLoading(true);

    try {
      const response = await verifyEmailCode(email, code); // ← API 함수 호출

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
