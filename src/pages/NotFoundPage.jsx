import { useNavigate } from "react-router-dom";
import "../styles/notFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="code">404</div>
      <p className="message">페이지를 찾을 수 없습니다.</p>
      <p className="sub">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <button className="button" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
