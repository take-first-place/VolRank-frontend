import { useState } from "react";
import { uploadCertificate } from "../api/certificate";

function CertificateUploadSection() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if(!selectedFile){
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    if(
      !fileName.endsWith(".pdf") &&
      !fileName.endsWith(".jpg") &&
      !fileName.endsWith(".png")
    ) {
      alert("pdf, jpg, png 파일만 업로드 가능");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    console.log("버튼 눌림");
    if (!file){
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", file);

    formData.append("volunteerParticipationId", 1);

    uploadCertificate(formData)
    .then((res) => {
      console.log("업로드 성공:", res.data);
      alert("업로드 성공");
      window.location.reload();
    })
    .catch((err) => {
      console.log("업로드 실패:", err);
      alert("업로드 실패");
    });
  };
  return (
    <div>
      <p>인증서 업로드</p>
      <p> pdf, jpg, png 파일만 업로드 가능</p>
      <input type="file" onChange = {handleChange} />
      <button onClick = {handleUpload}>업로드</button>

      {file && <p>선택한 파일 : {file.name}</p>}
    </div>
  );
}

export default CertificateUploadSection;