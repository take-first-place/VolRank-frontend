import api from "./axios";

export const getSidos = () => {
  return api.get("/api/regions/sidos");
};

export const getSigungus = (sidoCode) => {
  return api.get("/api/regions/sigungu", {
    params: {
      sidoCode,
    },
  });
};
