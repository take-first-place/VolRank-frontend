import api from "./axios";

// 관리자 인증서 전체 목록 조회
export const getAdminCertificates = async () => {
  const response = await api.get("/api/certificates/admin");
  return response.data;
};

// 승인 대기 목록 조회 (관리자)
export const getPendingCertificates = async () => {
  const response = await api.get("/api/certificates/admin/pending");
  return response.data;
};

// 인증서 승인 / 반려
export const reviewCertificate = async ({
  certificateId,
  status,
  rejectedReason = "",
}) => {
  const response = await api.patch(
    `/api/certificates/${certificateId}/review`,
    {
      status,
      rejectedReason,
    },
  );

  return response.data;
};
