import api from "./axios";

// ID로 사용자 조회
export const getUserById = (userId) => {
  return api.get(`/api/users/${userId}`);
};

// 마이페이지 요약 조회
export const getMyPageSummary = () => {
  return api.get("/api/users/me/summary");
};

export default {
  getUserById,
  getMyPageSummary,
};
