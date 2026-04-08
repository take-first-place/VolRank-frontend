import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home({isLoggedIn}) {
  const navigate = useNavigate();

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div>
        <h1> 메인페이지</h1>
        <button onClick={() => navigate("/login")}>로그인</button>

        <button onClick={() => navigate("/signup")}>회원가입</button>
      </div>
    </Layout>
  );
}
export default Home;
