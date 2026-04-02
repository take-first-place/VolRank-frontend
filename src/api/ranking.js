import api from "./axios";

export const getRankings = async ({ type, period, page = 1, limit = 10 }) => {
  const response = await api.get("/api/rankings", {
    params: {
      type,
      period,
      page,
      limit,
    },
  });

  return response.data;
};