import api from "./axios";

const getMyCertificates = async () => {
  const response = await api.get("/api/certificates/my");
  return response.data;
};

const createCertificate = async (formData) => {
  const response = await api.post("/api/certificates", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const certificateApi = {
  getMyCertificates,
  createCertificate,
};

export default certificateApi;
