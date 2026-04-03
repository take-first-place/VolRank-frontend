import CertificateUploadSection from "../components/CertificateUploadSection";
import CertificateStatusSection from "../components/CertificateStatusSection";

function MyPage() {
  return (
    <div className="mypage">
      <h1 className="mypage-title">마이페이지</h1>
      <p className="mypage-subtitle">
        내 봉사활동 정보를 확인할 수 있습니다.
      </p>

      <div className="mypage-section">
        <h2>인증서 제출 현황</h2>
        <div className="mypage-box">
          <CertificateStatusSection />
          <CertificateUploadSection />
        </div>
      </div>

      <div className="mypage-section">
        <h2>신청한 봉사활동</h2>
        <div className="mypage-box">
          <p className="mypage-empty-text">
            신청한 봉사활동이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;