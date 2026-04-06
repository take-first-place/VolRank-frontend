import { useEffect, useState } from "react";
import { getMyCertificates } from "../api/certificate";


function CertificateStatusSection() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    getMyCertificates()
    .then((res) => {
      console.log("응답:", res.data);
      setCertificates(res.data.data || []);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      <h3>제출한 인증서</h3>

    {certificates.length > 0? (
      certificates.map((item) => (
      <div className="certificate-item" key={item.id}>
        <p>파일명: {item.file_name || item.certificate_path || "-"}</p>
        <p>제출일: {item.created_at || item.createdAt || "_"}</p>
        <p>상태: {item.status || "_"} </p>
      </div>
      ))
    ) : (
      
      <p className="mypage-empty-text">아직 제출한 인증서가 없습니다.</p>
    )}
    </div>
  );
}

export default CertificateStatusSection;