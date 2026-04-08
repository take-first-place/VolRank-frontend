export const styles = {
  // 레이아웃
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  main: {
    flex: 1,
    overflow: "auto",
  },

  // 헤더
  header: {
    padding: "32px 32px 0",
    marginBottom: "24px",
  },
  headerTitle: {
    margin: "0 0 4px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  headerSub: {
    margin: 0,
    fontSize: "14px",
    color: "#9ca3af",
  },

  // 컨텐츠
  content: {
    padding: "0 32px 32px",
  },

  // 통계 카드
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    borderRadius: "10px",
    padding: "16px 20px",
  },
  statLabel: {
    margin: "0 0 4px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  statValue: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },

  // 필터
  filterRow: {
    display: "flex",
    gap: "6px",
    marginBottom: "16px",
  },
  filterBtn: {
    padding: "7px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    color: "#6b7280",
    cursor: "pointer",
  },
  filterBtnActive: {
    backgroundColor: "#eef2ff",
    borderColor: "#c7d2fe",
    color: "#4f46e5",
  },

  // 테이블
  tableWrap: {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  theadRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #f0f0f0",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#9ca3af",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  tr: {
    borderBottom: "1px solid #f9f9f9",
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "middle",
  },

  // 버튼
  approveBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ecfdf5",
    color: "#059669",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  rejectBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  resetBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
  },

  // 상태 배지
  statusBadge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "999px",
  },

  // 텍스트 스타일
  userName: {
    margin: 0,
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a1a",
  },
  userEmail: {
    margin: 0,
    fontSize: "12px",
    color: "#9ca3af",
  },
  activityText: {
    fontSize: "14px",
  },
  hoursText: {
    fontSize: "14px",
  },
  dateText: {
    fontSize: "13px",
    color: "#6b7280",
  },
  linkText: {
    fontSize: "13px",
    color: "#4f46e5",
    textDecoration: "none",
  },
  emptyText: {
    textAlign: "center",
    padding: "40px",
    color: "#9ca3af",
    fontSize: "14px",
  },
  placeholderText: {
    color: "#9ca3af",
  },
};

// 상태별 색상 맵
export const statusColorMap = {
  pending: {
    label: "대기중",
    bg: "#fff8e1",
    color: "#b45309",
  },
  approved: {
    label: "승인됨",
    bg: "#ecfdf5",
    color: "#065f46",
  },
  rejected: {
    label: "반려됨",
    bg: "#fef2f2",
    color: "#991b1b",
  },
};

// 필터 라벨 맵
export const filterLabelMap = {
  all: "전체",
  pending: "대기중",
  approved: "승인됨",
  rejected: "반려됨",
};

// 테이블 헤더
export const tableHeaders = [
  "신청자",
  "봉사활동",
  "시간",
  "제출일",
  "상태",
  "파일",
  "처리",
];
