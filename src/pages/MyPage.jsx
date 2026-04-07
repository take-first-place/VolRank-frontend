import { useEffect, useState } from "react";
import CertificateUploadSection from "../components/CertificateUploadSection";
import CertificateStatusSection from "../components/CertificateStatusSection";
import Layout from "../components/Layout";
import { getMyCertificates } from "../api/certificate";
import "../styles/mypage.css";

function MyPage({ isLoggedIn }) {
  const [certificates, setCertificates ] = useState ([]);

  const fetchCertificates = () => {
    getMyCertificates()
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
  },[]);
  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="mypage">
        <h1 className="mypage-title">마이페이지</h1>
        <p className="mypage-subtitle">내 봉사활동 정보를 확인할 수 있습니다.</p>

        <div className="mypage-section">
          <h2>내 정보</h2>
          <div className="mypage-box">
            <p>이름: -</p>
            <p>이메일: -</p>
            <p>지역: -</p>
            <p className="mypage-empty-text">회원 정보를 불러올 수 없습니다.</p>
          </div>
        </div>

        <div className="mypage-section">
          <h2>인증서 제출 현황</h2>
          <div className="mypage-box">
            <CertificateStatusSection certificates = {certificates}/>
            <CertificateUploadSection fetchCertificates = {fetchCertificates}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;