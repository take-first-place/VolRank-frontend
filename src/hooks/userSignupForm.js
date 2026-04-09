import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { REGIONS } from "../constants/regionData";

/**
 * 회원가입 폼 상태 및 비즈니스 로직을 담당하는 커스텀 훅
 * UI 컴포넌트(Signup.jsx)에서 로직을 분리
 */
export const useSignupForm = () => {
  const navigate = useNavigate();
  const {
    signup,
    sendVerificationCode,
    verifiedEmailCode,
    isLoading,
    error,
    clearError,
  } = useAuth();

  // ── 폼 상태 ──────────────────────────────────────────────
  const [form, setForm] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    city_code: "", // 시도 코드 (2자리)
    district_code: "", // 시군구 코드 (5자리) → 서버 전송 값
  });

  // ── 이메일 인증 상태 ──────────────────────────────────────
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // ── 에러 ─────────────────────────────────────────────────
  const [validationError, setValidationError] = useState("");

  // 현재 선택된 시도에 해당하는 구/군 목록
  const selectedRegion = REGIONS.find((r) => r.code === form.city_code);
  const districtOptions = selectedRegion?.districts ?? [];

  // ── 공통 핸들러 ───────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 시도가 바뀌면 시군구 초기화
    if (name === "city_code") {
      setForm((prev) => ({ ...prev, city_code: value, district_code: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (validationError) setValidationError("");
    if (error) clearError();
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // ── 이메일 인증번호 전송 ──────────────────────────────────
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

  // ── 인증번호 확인 ─────────────────────────────────────────
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

  // ── 폼 유효성 검사 ────────────────────────────────────────
  const validate = () => {
    if (!form.email) return "이메일을 입력해주세요";
    if (!isEmailVerified) return "이메일 인증을 완료해주세요";

    if (!form.username) return "아이디를 입력해주세요";
    if (!form.nickname) return "닉네임을 입력해주세요";

    if (!form.password) return "비밀번호를 입력해주세요";
    if (!form.confirmPassword) return "비밀번호 확인을 입력해주세요";

    if (form.password !== form.confirmPassword) return "비밀번호가 다릅니다";

    if (!form.city_code) return "시/도를 선택해주세요";
    if (!form.district_code) return "시/군/구를 선택해주세요";

    return null;
  };

  // ── 회원가입 제출 ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();

    if (errorMsg) {
      setValidationError(errorMsg);
      alert(errorMsg);
      return;
    }

    const result = await signup({
      username: form.username,
      nickname: form.nickname,
      email: form.email,
      password: form.password,
      region_code: form.district_code, // 서버에는 상세 코드(5자리) 전송
    });

    if (result.success) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    }
  };

  return {
    // 상태
    form,
    verificationCode,
    isEmailVerified,
    isCodeSent,
    districtOptions,
    displayError: validationError || error,
    isLoading,

    // 핸들러
    navigate,
    handleChange,
    handleVerificationCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleSubmit,
  };
};
