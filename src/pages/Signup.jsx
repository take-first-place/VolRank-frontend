import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import "../styles/signup.css";

export const Signup = () => {
  const navigate = useNavigate();

  const {
    signup,
    sendVerificationCode,
    verifiedEmailCode,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    region_code: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (validationError) setValidationError("");
    if (error) clearError();
  };

  // 인증번호 전송
  const handleSendCode = async () => {
    if (!form.email) {
      setValidationError("이메일을 입력해주세요");
      return;
    }

    const result = await sendVerificationCode(form.email);
    if (result.success) {
      setIsCodeSent(true);
      alert("인증번호가 전송되었습니다.");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setValidationError("인증번호를 입력해주세요");
      return;
    }

    const result = await verifiedEmailCode(form.email, verificationCode);
    if (result.success) {
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 검증
    if (
      !form.username ||
      !form.nickname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.region_code
    ) {
      setValidationError("모든 값을 입력해주세요");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setValidationError("비밀번호가 다릅니다");
      return;
    }

    // API 호출
    const result = await signup({
      username: form.username,
      nickname: form.nickname,
      email: form.email,
      password: form.password,
      region_code: form.region_code,
    });

    if (result.success) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    }
  };

  const displayError = validationError || error;

  return (
    <Layout>
      <div className="signup-page">
        <div className="signup-wrapper">
          <h1 className="signup-title">회원가입</h1>
          <p className="signup-subtitle">VolRank와 함께 봉사를 시작하세요</p>

          <div className="signup-card">
            {displayError && <div className="signup-error">{displayError}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              {/* 이메일 + 인증 */}
              <div className="signup-group">
                <label>이메일</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isLoading || isEmailVerified}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isLoading || isEmailVerified}
                    className="signup-button-secondary"
                  >
                    {isCodeSent ? "재전송" : "인증번호"}
                  </button>
                </div>
              </div>

              {/* 인증번호 입력 */}
              {isCodeSent && !isEmailVerified && (
                <div className="signup-group">
                  <label>인증번호</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="인증번호 6자리"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      disabled={isLoading}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={isLoading}
                      className="signup-button-secondary"
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}

              {isEmailVerified && (
                <div
                  style={{
                    color: "#16a34a",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  ✓ 이메일 인증 완료
                </div>
              )}

              {/* 나머지 필드들 */}
              <div className="signup-group">
                <label>아이디</label>
                <input
                  type="text"
                  name="username"
                  placeholder="아이디"
                  value={form.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="signup-group">
                <label>비밀번호</label>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="signup-group">
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="signup-group">
                <label>닉네임</label>
                <input
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={form.nickname}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="signup-group">
                <label>지역</label>
                <select
                  name="region_code"
                  value={form.region_code}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">지역 선택</option>
                  <option value="11">서울</option>
                  <option value="26">부산</option>
                  <option value="27">대구</option>
                  <option value="28">인천</option>
                  <option value="29">광주</option>
                  <option value="30">대전</option>  
                  <option value="31">울산</option>
                  <option value="36">세종</option>
                  <option value="41">경기</option>
                  <option value="42">강원</option>
                  <option value="43">충북</option>
                  <option value="44">충남</option>
                  <option value="45">전북</option>
                  <option value="46">전남</option>
                  <option value="47">경북</option>
                  <option value="48">경남</option>
                  <option value="50">제주</option>
                </select>
              </div>

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? "가입 중..." : "회원가입"}
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
    </Layout>
  );
};

export default Signup;
