import CertificateUploadSection from "../components/CertificateUploadSection";
import CertificateStatusSection from "../components/CertificateStatusSection";
import UserInfoSection from "../components/UserInfoSection";
import Layout from "../components/Layout";
import { useMyPage } from "../hooks/useMypage";
import "../styles/mypage.css";
import axios from "axios";

<<<<<<< HEAD
const MyPage = () => {
  const {
    user,
    userLoading,
    userError,
    certificates,
    certLoading,
    certError,
    fetchCertificates,
  } = useMyPage();

=======
export const MyPage = () => {
  const { user, loading: userLoading, error: userError } = useUser(); // ✅ 사용자 정보
  const [certificates, setCertificates] = useState([]);
  const [file, setFile] = useState([]);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async() => {
    if(!file){
      alert("파일을 선택하세요");
      return;
    };
  

    const formData = new FormData();
    formData.append("file", file); 
  

  try{
    await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    alert("업로드 성공");
    }catch(err){
   console.error(err);
    alert("업로드 실패")
      };
    };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // 사용자 정보 로딩중
>>>>>>> 08cacf1 (feat:마이페이지 파일 업로드 기능 추가)
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

        {/* 내 정보 */}
        <div className="mypage-section">
          <h2>내 정보</h2>
          <div className="mypage-box">
            <UserInfoSection user={user} userError={userError} />
          </div>
        </div>

        {/* 인증서 제출 현황 */}
        <div className="mypage-section">
          <h2>인증서 제출 현황</h2>
          <div className="mypage-box">
            {certError && <p className="mypage-error">{certError}</p>}
            <CertificateStatusSection
              certificates={certificates}
              isLoading={certLoading}
            />
            <CertificateUploadSection fetchCertificates={fetchCertificates} />
          </div>
        </div>

        <div>
          <input type="file" onChange={handleFileChange}/>

          <button onClick={handleUpload}>업로드</button>
        </div>
      </div>
    </Layout>
  );
};


export default MyPage;
