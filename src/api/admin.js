import api from "./axios";

// 인증서 승인 / 반려
export const reviewCertificate = (certificateId, status, reason) => {
  return api.patch(`/certificates/${certificateId}/review`, {
    status, // "APPROVED" | "REJECTED"
    reason,
  });
};

// 승인 대기 목록 조회 (관리자)
export const getPendingCertificates = () => {
  return api.get("/certificates/admin/pending");
};

// 특정 참여 인증서 조회
export const getCertificatesByParticipation = (participationId) => {
  return api.get(`/certificates/${participationId}`);
};
