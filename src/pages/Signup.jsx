import Layout from "../components/Layout";
import RegionSelect from "../components/RegionSelect";
import { useSignupForm } from "../hooks/userSignupForm";
import "../styles/signup.css";

/**
 * 회원가입 페이지
 *
 * 관심사 분리:
 *   - 폼 상태 / 유효성 검사 / API 호출  →  useSignupForm (hooks/useSignupForm.js)
 *   - 지역 데이터 (코드 + 이름 매핑)    →  regionData    (constants/regionData.js)
 *   - 지역 선택 UI                      →  RegionSelect  (components/RegionSelect.jsx)
 *   - 페이지 렌더링 (이 파일)           →  Signup
 */
const Signup = () => {
  const {
    form,
    verificationCode,
    isEmailVerified,
    isCodeSent,
    districtOptions,
    displayError,
    isLoading,
    navigate,
    handleChange,
    handleVerificationCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleSubmit,
  } = useSignupForm();

  return (
    <Layout>
      <div className="signup-page">
        <div className="signup-wrapper">
          <h1 className="signup-title">회원가입</h1>
          <p className="signup-subtitle">VolRank와 함께 봉사를 시작하세요</p>

          <div className="signup-card">
            {displayError && <div className="signup-error">{displayError}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              {/* 이메일 + 인증번호 전송 버튼 */}
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

              {/* 인증번호 입력 (코드 전송 후 & 인증 완료 전) */}
              {isCodeSent && !isEmailVerified && (
                <div className="signup-group">
                  <label>인증번호</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="인증번호 6자리"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
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

              {/* 인증 완료 메시지 */}
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

              {/* 아이디 */}
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

              {/* 비밀번호 */}
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

              {/* 비밀번호 확인 */}
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

              {/* 닉네임 */}
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

              {/* 지역 선택 (시도 + 시군구 2단계) */}
              <RegionSelect
                cityCode={form.city_code}
                districtCode={form.district_code}
                districtOptions={districtOptions}
                onChange={handleChange}
                disabled={isLoading}
              />

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </button>
            </form>

            <div className="signup-divider" />

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
