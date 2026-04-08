import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { styles, menuItems, Icons } from "../styles/adminSidebar.style";

const AdminSidebar = ({ pendingCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 아이콘 매핑
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <aside style={styles.sidebar}>
      {/* 로고 */}
      <div style={styles.logoArea}>
        <span style={styles.logoText}>Admin</span>
        <span style={styles.logoBadge}>관리자</span>
      </div>

      {/* 관리자 정보 */}
      <div style={styles.userCard}>
        <div style={styles.avatar}>{user?.name?.[0] ?? "A"}</div>
        <div>
          <p style={styles.userName}>{user?.name ?? "관리자"}</p>
          <p style={styles.userEmail}>{user?.email ?? ""}</p>
        </div>
      </div>

      {/* 메뉴 */}
      <nav style={styles.nav}>
        <p style={styles.navLabel}>메뉴</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            <span style={styles.navIcon}>{renderIcon(item.icon)}</span>
            <span style={styles.navText}>{item.label}</span>
            {item.badge && pendingCount > 0 && (
              <span style={styles.badge}>{pendingCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 홈으로 / 로그아웃 */}
      <div style={styles.footer}>
        <button style={styles.footerBtn} onClick={() => navigate("/")}>
          <Icons.Home />
          홈으로
        </button>
        <button
          style={{ ...styles.footerBtn, ...styles.logoutBtn }}
          onClick={handleLogout}
        >
          <Icons.Logout />
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
