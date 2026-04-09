import { useEffect, useState } from "react";
import { certificateApi } from "../api/certificate";
import { useUser } from "./useUser";

export const useMyPage = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const [certificates, setCertificates] = useState([]);
  const [certLoading, setCertLoading] = useState(false);
  const [certError, setCertError] = useState(null);

  const fetchCertificates = () => {
    setCertLoading(true);
    setCertError(null);

    certificateApi
      .getMyCertificates()
      .then((res) => {
        setCertificates(res.data.data || []);
      })
      .catch((err) => {
        console.error("인증서 목록 조회 실패:", err);
        setCertError("인증서 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setCertLoading(false);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCertificates();
  }, []);

  return {
    user,
    userLoading,
    userError,
    certificates,
    certLoading,
    certError,
    fetchCertificates,
  };
};
