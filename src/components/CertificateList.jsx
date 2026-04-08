import { useState } from "react";
import { certificateApi } from "../api/certificate";
import {
  styles,
  statusColorMap,
  filterLabelMap,
  tableHeaders,
} from "../styles/admin.style";

const StatusBadge = ({ status }) => {
  const s = statusColorMap[status] ?? statusColorMap.pending;
  return (
    <span
      style={{
        ...styles.statusBadge,
        backgroundColor: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
};

// ─── 인증서 목록 페이지 ────────────────────────────────────
const CertificateList = ({ certs, setCerts, filter, setFilter }) => {
  const [updating, setUpdating] = useState(null);
  const filtered =
    filter === "all" ? certs : certs.filter((c) => c.status === filter);
  const pendingCount = certs.filter((c) => c.status === "pending").length;

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      // API 호출로 상태 변경
      await certificateApi.reviewCertificate(id, { status });

      // 로컬 상태 업데이트
      setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch (error) {
      console.error("Failed to update certificate status:", error);
      alert("상태 변경에 실패했습니다.");
    } finally {
      setUpdating(null);
    }
  };

  // 통계 데이터
  const stats = [
    { label: "전체", value: certs.length, color: "#4f46e5" },
    { label: "대기중", value: pendingCount, color: "#d97706" },
    {
      label: "승인됨",
      value: certs.filter((c) => c.status === "approved").length,
      color: "#059669",
    },
    {
      label: "반려됨",
      value: certs.filter((c) => c.status === "rejected").length,
      color: "#ef4444",
    },
  ];

  return (
    <div style={styles.content}>
      {/* 상단 요약 */}
      <div style={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={{ ...styles.statValue, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* 필터 탭 */}
      <div style={styles.filterRow}>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {}),
            }}
          >
            {filterLabelMap[f]}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              {tableHeaders.map((h) => (
                <th key={h} style={styles.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={styles.emptyText}>
                  해당하는 인증서가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((cert) => (
                <tr key={cert.id} style={styles.tr}>
                  <td style={styles.td}>
                    <p style={styles.userName}>{cert.userName}</p>
                    <p style={styles.userEmail}>{cert.email}</p>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.activityText}>{cert.activity}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.hoursText}>{cert.hours}시간</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateText}>{cert.submittedAt}</span>
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={cert.status} />
                  </td>
                  <td style={styles.td}>
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.linkText}
                    >
                      보기
                    </a>
                  </td>
                  <td style={styles.td}>
                    {updating === cert.id ? (
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                        처리중...
                      </span>
                    ) : cert.status === "pending" ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          style={styles.approveBtn}
                          onClick={() => updateStatus(cert.id, "approved")}
                          disabled={updating !== null}
                        >
                          승인
                        </button>
                        <button
                          style={styles.rejectBtn}
                          onClick={() => updateStatus(cert.id, "rejected")}
                          disabled={updating !== null}
                        >
                          반려
                        </button>
                      </div>
                    ) : (
                      <button
                        style={styles.resetBtn}
                        onClick={() => updateStatus(cert.id, "pending")}
                        disabled={updating !== null}
                      >
                        되돌리기
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateList;
