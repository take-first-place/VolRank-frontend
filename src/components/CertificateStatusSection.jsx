function CertificateStatusSection({certificates}) {

  return (
    <div>
      <h3>제출한 인증서</h3>

    {certificates.length > 0? (
      certificates.map((item) => (
      <div className="certificate-item" key={item.id}>
        <p>봉사명: {item.activity_title || "-"}</p>
        <p>파일명: {item.file_url || "-"}</p>
        <p>제출일: {item.submitted_at || "-"}</p>
        <p>상태: {item.status || "-"} </p>
        {item.status === "REJECTED" && (
          <p>반려 사유: {item.rejected_reason || "-"}</p>
        )}
      </div>
      ))
    ) : (
      
      <p className="mypage-empty-text">아직 제출한 인증서가 없습니다.</p>
    )}
    </div>
  );
}

export default CertificateStatusSection;