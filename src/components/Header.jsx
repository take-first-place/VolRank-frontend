import { Link } from "react-router-dom";

const Header = () => {
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
        </nav>

        <div className="auth-menu">
          <Link to="/login" className="nav-link">
            로그인 
          </Link>
          <Link to="/signup" className="signup-btn">
            회원가입 
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header