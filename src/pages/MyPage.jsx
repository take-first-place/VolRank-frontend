import { useEffect, useState } from "react";
import CertificateUploadSection from "../components/CertificateUploadSection";
import CertificateStatusSection from "../components/CertificateStatusSection";
import Layout from "../components/Layout";
import { certificateApi } from "../api/certificate";
import { useUser } from "../hooks/useUser"; // ✅ useUser 사용
import "../styles/mypage.css";

export const MyPage = () => {
  const { user, loading: userLoading, error: userError } = useUser(); // ✅ 사용자 정보
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = () => {
    certificateApi
      .getMyCertificates()
      .then((res) => {
        console.log("인증서 목록 응답:", res.data);
        setCertificates(res.data.data || []);
      })
      .catch((err) => {
        console.log("인증서 목록 조회 실패:", err);
      });
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // 사용자 정보 로딩중
  if (userLoading) {
    return (
      <Layout>
        <div className="mypage">
          <p>사용자 정보 로딩중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mypage">
        <h1 className="mypage-title">마이페이지</h1>
        <p className="mypage-subtitle">
          내 봉사활동 정보를 확인할 수 있습니다.
        </p>

        <div className="mypage-section">
          <h2>내 정보</h2>
          <div className="mypage-box">
            {user ? (
              <>
                <p>이름: {user.username}</p>
                <p>닉네임: {user.nickname}</p>
                <p>이메일: {user.email}</p>
                <p>지역: {user.region_code}</p>
                <p>가입일: {new Date(user.created_at).toLocaleDateString()}</p>
              </>
            ) : userError ? (
              <p className="mypage-error">에러: {userError}</p>
            ) : (
              <p className="mypage-empty-text">
                회원 정보를 불러올 수 없습니다.
              </p>
            )}
          </div>
        </div>

        <div className="mypage-section">
          <h2>인증서 제출 현황</h2>
          <div className="mypage-box">
            <CertificateStatusSection certificates={certificates} />
            <CertificateUploadSection fetchCertificates={fetchCertificates} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
