import api from "./axios";

// ID로 사용자 조회
export const getUserById = (userId) => {
  return api.get(`/api/users/${userId}`);
};

export default { getUserById };
