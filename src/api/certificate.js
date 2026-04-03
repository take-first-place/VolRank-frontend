import api from "./axios";

export const uploadCertificate = (formData) => {
  return api.post("/api/certificates", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyCertificates = () => {
  return api.get("/api/certificates/my");
};