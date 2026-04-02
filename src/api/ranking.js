import api from "./axios";

export const getRankings = async ({ type, period, page = 1, limit = 10 }) => {
  const response = await api.get("/api/rankings", {
    params: {
      type, // 유저 / 지역
      period, // 일간 / 주간 / 월간
      page, // 페이지 번호
      limit, // 한 페이지 개수
    },
  });

  return response.data;
};