import apiClient from "./axios";

export const certificateApi = {
  /**
   * 내 인증서 목록 조회
   * GET /api/certificates/my
   */
  getMyCertificates: async () => {
    const response = await apiClient.get("/api/certificates/my");
    return response.data;
  },

  /**
   * 인증서 상세 조회
   * GET /api/certificates/:id
   */
  getCertificateById: async (id) => {
    const response = await apiClient.get(`/api/certificates/${id}`);
    return response.data;
  },

  /**
   * 인증서 등록
   * POST /api/certificates
   */
  createCertificate: async (formData) => {
    const response = await apiClient.post("/api/certificates", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * 인증서 검토 (승인/반려)
   * PATCH /api/certificates/:id/review
   */
  reviewCertificate: async (id, data) => {
    const response = await apiClient.patch(
      `/api/certificates/${id}/review`,
      data,
    );
    return response.data;
  },

  /**
   * 전체 인증서 조회 (관리자용)
   * GET /api/certificates
   */
  getAllCertificates: async (params = {}) => {
    const response = await apiClient.get("/api/certificates", { params });
    return response.data;
  },
};

export default certificateApi;
