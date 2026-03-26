# 🎨 Frontend (React + Vite)

## 📌 프로젝트 소개
이 프로젝트는 React + Vite 기반의 프론트엔드입니다.  
백엔드 API와 통신하여 사용자 UI를 제공합니다.

---

## 🛠️ 기술 스택
- React
- Vite
- Axios
- React Router

---

## 📂 폴더 구조
src/ <br>
├── components/ # 재사용 컴포넌트 <br>
├── pages/ # 페이지 <br>
├── api/ # API 호출 <br>
├── hooks/ # 커스텀 훅 <br>
├── store/ # 상태 관리 <br>
└── assets/ # 이미지, 스타일 <br>

---

## ⚙️ 실행 방법

### 1️⃣ 패키지 설치
```bash
npm install
```
### 2️⃣ 환경 변수 설정
```text
VITE_API_URL=http://localhost:3000
```
---

### 3️⃣ 실행
```bash
npm run dev
```

---

## 🌐 API 연결

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```