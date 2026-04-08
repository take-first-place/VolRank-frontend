import apiClient from "./axios";

export const certificateApi = {
  /**
   * 내 인증서 목록 조회
   * GET /certificates/my
   */
  getMyCertificates: async () => {
    const response = await apiClient.get("/certificates/my");
    return response.data;
  },

  /**
   * 인증서 상세 조회
   * GET /certificates/:id
   */
  getCertificateById: async (id) => {
    const response = await apiClient.get(`/certificates/${id}`);
    return response.data;
  },

  /**
   * 인증서 등록
   * POST /certificates
   * @param {FormData} formData - volunteerParticipationId, certificate 파일
   */
  createCertificate: async (formData) => {
    const response = await apiClient.post("/certificates", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * 인증서 검토 (승인/반려)
   * GET /certificates/:id/review
   * @param {string} id - 인증서 ID
   * @param {Object} data - { status: 'approved'|'rejected', rejectedReason?: string }
   */
  reviewCertificate: async (id, data) => {
    const response = await apiClient.get(`/certificates/${id}/review`, data);
    return response.data;
  },

  /**
   * 전체 인증서 조회 (관리자용)
   * GET /certificates
   */
  getAllCertificates: async (params = {}) => {
    const response = await apiClient.get("/certificates", { params });
    return response.data;
  },
};

export default certificateApi;
