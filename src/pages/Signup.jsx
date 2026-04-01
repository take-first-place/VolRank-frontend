import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    region_code: "",
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

    if (
      !form.username ||
      !form.nickname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.region_code
    ) {
      alert("모든 값을 입력해주세요");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 다릅니다");
      return;
    }

    console.log("회원가입 요청:", form);
    alert("회원가입 완료 (임시)");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <h1 className="signup-title">회원가입</h1>
        <p className="signup-subtitle">VolRank와 함께 봉사를 시작하세요</p>

        <div className="signup-card">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-group">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                placeholder="아이디"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="signup-group">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="signup-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="signup-group">
              <label>닉네임</label>
              <input
                type="text"
                name="nickname"
                placeholder="사용할 닉네임"
                value={form.nickname}
                onChange={handleChange}
              />
            </div>

            <div className="signup-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="signup-group">
              <label>지역</label>
              <select
                name="region_code"
                value={form.region_code}
                onChange={handleChange}
              >
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="부산">부산</option>
              </select>
            </div>

            <button type="submit" className="signup-button">
              회원가입
            </button>
          </form>

          <div className="signup-divider"></div>

          <p className="signup-login-text">
            이미 계정이 있으신가요?{" "}
            <span onClick={() => navigate("/login")}>로그인</span>
          </p>
        </div>
      </div>
    </div>
  );
}



export default Signup;
