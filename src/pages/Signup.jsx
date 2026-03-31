import { useState } from "react";

function Signup() {
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

    console.log(form);
    alert("회원가입 완료");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>회원가입</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="region_code"
            value={form.region_code}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">지역 선택</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
          </select>

          <button type="submit" style={styles.button}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f7fb",
  },
  card: {
    background: "white",
    padding: "32px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "8px",
  },
  desc: {
    marginBottom: "16px",
    color: "#666",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    boxSizing: "border-box",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
  },
  button: {
    width: "100%",
    marginTop: "18px",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;
