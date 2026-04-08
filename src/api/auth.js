import api from "./axios";

// 로그인
export const loginUser = (loginData) => {
  return api.post("/api/auth/login", loginData);
};

// 회원가입 - API 문서 기준 경로로 수정
export const signupUser = (signupData) => {
  return api.post("/api/users/register", signupData);
};

// 이메일 인증번호 전송
export const sendCode = (email) => {
  return api.post("/api/users/send-code", { email });
};

// 이메일 인증번호 확인
export const verifyEmailCode = (email, code) => {
  return api.post("/api/users/verify-code", { email, code: Number(code) });
};
