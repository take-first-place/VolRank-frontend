import api from "./axios";

export const loginUser = (loginData) => {
  return api.post("/api/auth/login", loginData);
};