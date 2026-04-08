import api from "./axios";

export const getNationalRanking = () => {
  return api.get("/api/rank/national");
};

export const getRegionalRanking = (regionCode) => {
  return api.get(`/api/rank/region/${regionCode}`);
};
