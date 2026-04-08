import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  loading: false,
  login: () => {},
  logout: () => {},
  getToken: () => null,
  // 회원가입 관련
  signup: async () => {},
  sendVerificationCode: async () => {},
  verifyEmailCode: async () => {},
  isLoading: false,
  error: null,
  clearError: () => {},
});

export default AuthContext;
