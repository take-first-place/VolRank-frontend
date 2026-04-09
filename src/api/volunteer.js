import api from "./axios";

export const getVolunteers = (params) => {
  return api.get("/api/volunteers", { params });
};
