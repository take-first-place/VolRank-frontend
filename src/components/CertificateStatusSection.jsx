function CertificateStatusSection() {
  return (
    <div>
      <h3>제출한 인증서</h3>

      <div className="certificate-item">
        <p>파일명: -</p>
        <p>제출일: -</p>
        <p>상태: -</p>
      </div>

      <p className="mypage-empty-text">아직 제출한 인증서가 없습니다.</p>
    </div>
  );
}

export default CertificateStatusSection;