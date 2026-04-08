import { Home, LogOut, Clock, Award, FileText, User } from "lucide-react";

export const menuItems = [
  {
    id: "certificates",
    label: "인증서 관리",
    icon: "Certificate",
    path: "/admin/certificates",
  },
  {
    id: "pending",
    label: "승인 대기",
    icon: "Clock",
    path: "/admin/pending",
    badge: true,
  },
  {
    id: "users",
    label: "회원 관리",
    icon: "Users",
    path: "/admin/users",
  },
];

// 스타일 객체 (순수 JS, JSX 없음)
export const styles = {
  // 레이아웃
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    flexShrink: 0,
  },

  // 로고 영역
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "24px 20px 16px",
    borderBottom: "1px solid #f5f5f5",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  logoBadge: {
    fontSize: "11px",
    fontWeight: "600",
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    padding: "2px 8px",
    borderRadius: "999px",
  },

  // 사용자 카드
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 20px",
    borderBottom: "1px solid #f5f5f5",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "600",
    flexShrink: 0,
  },
  userName: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  userEmail: {
    margin: 0,
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "2px",
  },

  // 네비게이션
  nav: {
    flex: 1,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navLabel: {
    margin: "0 0 8px 8px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#9ca3af",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    textDecoration: "none",
    transition: "background 0.15s, color 0.15s",
    position: "relative",
  },
  navItemActive: {
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  navText: {
    flex: 1,
  },
  badge: {
    backgroundColor: "#ef4444",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "1px 7px",
    borderRadius: "999px",
    minWidth: "20px",
    textAlign: "center",
  },

  // 푸터
  footer: {
    padding: "12px",
    borderTop: "1px solid #f5f5f5",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  footerBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#6b7280",
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  logoutBtn: {
    color: "#ef4444",
  },
};

export const Icons = {
  Home: Home,
  Logout: LogOut, // 이름 맞춰주는 게 중요
  Clock: Clock,
  Certificate: Award, // 인증서 느낌
  Pending: Clock,
  Document: FileText,
  User: User,
};
