import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          VolRank
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            홈
          </Link>
          <Link to="/volunteers" className="nav-link">
            봉사활동
          </Link>
          <Link to="/ranking" className="nav-link">
            랭킹
          </Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link">
              관리자 페이지
            </Link>
          )}
        </nav>

        <div className="auth-menu">
          {isLoggedIn ? (
            <>
              <span>{user?.nickname}님</span>
              <Link to="/mypage" className="nav-link">
                마이페이지
              </Link>
              <button onClick={logout} className="logout-btn">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
              <Link to="/signup" className="signup-btn">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
