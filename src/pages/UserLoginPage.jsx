import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const UserLoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      console.log("로그인 응답:", response.data);

      const token = response.data.data.token;
      localStorage.setItem("token", token);

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);

      if (error.response) {
        alert(error.response.data.message || "로그인에 실패했습니다.");
      } else {
        alert("서버와 연결할 수 없습니다.");
      }
      
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h1 className="login-title">로그인</h1>
        <p className="login-subtitle">VolRank에 오신 것을 환영합니다</p>

        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={form.email}
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