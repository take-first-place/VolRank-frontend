// API 클라이언트
export { default as apiClient } from "./axios";

// 인증서 API
export {
  certificateApi,
  default as certificateApiDefault,
} from "./certificateApi";

// 관리자 API
export {
    reviewCertificate,
    getPendingCertificates,
    getCertificatesByParticipation,
    default as adminApiDefault,
} from "./admin";

// 로그인 API
export {
    loginUser,
    default as authApiDefault,
} from "./auth";