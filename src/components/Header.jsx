import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  const displayName =
    user?.nickname || user?.username || user?.name || user?.email || "";

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          VolRank
        </Link>

        <nav className="nav">
          <NavLink to="/" className={getNavLinkClass} end>
            홈
          </NavLink>
          <NavLink to="/volunteers" className={getNavLinkClass}>
            봉사활동
          </NavLink>
          <NavLink to="/ranking" className={getNavLinkClass}>
            랭킹
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={getNavLinkClass}>
              관리자 페이지
            </NavLink>
          )}
        </nav>

        <div className="auth-menu">
          {isLoggedIn ? (
            <>
              <span className="auth-user">
                {displayName ? `${displayName}님` : "회원님"}
              </span>
              <NavLink to="/mypage" className={getNavLinkClass}>
                마이페이지
              </NavLink>
              <button onClick={logout} className="logout-btn">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={getNavLinkClass}>
                로그인
              </NavLink>
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
