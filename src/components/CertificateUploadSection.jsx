import { useState } from "react";

function CertificateUploadSection(){
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
};
    const handleUpload = async() => {
      if (!selectedFile) {
        alert("파일을 선택해주세요");
        return;
  }  

    console.log("업로드 파일:", selectedFile);

    const formData = new FormData();
    formData.append("certificate", selectedFile);
    formData.append("volunteerParticipationId", 1);

    const token = localStorage.getItem("token");

    try {
    const res = await fetch("http://localhost:3000/api/certificates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log(data);

    alert("업로드 되었습니다.");
  } catch (err) {
    console.error(err);
    alert("업로드 실패했습니다.");
  }
};


    return(
        <div>
            <h2>인증서 업로드</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>업로드</button>
            <p>
            선택한 파일: {selectedFile ? selectedFile.name : "선택된 파일 없음"}
            </p>
        </div>
    );
}

export default CertificateUploadSection;