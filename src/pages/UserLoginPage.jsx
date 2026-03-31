import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    console.log("로그인 요청:", form);
    alert("로그인 성공 (임시)");

    // 로그인 성공 시 메인으로 이동 (임시)
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h1 className="login-title">로그인</h1>
        <p className="login-subtitle">VolRank에 오신 것을 환영합니다</p>

        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-group">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                placeholder="아이디를 입력하세요"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="login-group">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="login-button">
              로그인
            </button>
          </form>

          <div className="login-divider"></div>

          <p className="login-signup-text">
            계정이 없으신가요?{" "}
            <span onClick={() => navigate("/signup")}>회원가입</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;