import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import UserLoginPage from "./pages/UserLoginPage";
import RankingPage from "./pages/RankingPage";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/adminpage";
import VolunteerPage from "./pages/VolunteerPage";
import NotFoundPage from "./pages/NotFoundPage";

// AdminRoute가 없으면 임시로 인라인 처리
const AdminRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
      <Route
        path="/ranking"
        element={<RankingPage isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/volunteers"
        element={<VolunteerPage isLoggedIn={isLoggedIn} />}
      />

      {/* 비로그인 전용 */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" replace /> : <UserLoginPage />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
      />

      {/* 로그인 필요 */}
      <Route
        path="/mypage"
        element={isLoggedIn ? <MyPage /> : <Navigate to="/login" replace />}
      />

      {/* 관리자 전용 */}
      <Route
        path="/admin/*" // ← 와일드카드 추가 (중첩 라우트용)
        element={
          <AdminRoute isAdmin={isAdmin}>
            <AdminPage />
          </AdminRoute>
        }
      />

      {/* 404 처리 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
