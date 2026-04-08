import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../components/adminsidebar";
import CertificateList from "../components/CertificateList";
import { certificateApi } from "../api/certificate";
import { styles } from "../styles/admin.style";

// ─── AdminPage 루트 ────────────────────────────────────────
const AdminPage = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // 인증서 데이터 로드
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await certificateApi.getAllCertificates();
        // API 응답 구조에 따라 조정 필요
        setCerts(response.data || []);
      } catch (err) {
        setError("인증서 데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const pendingCount = certs.filter((c) => c.status === "pending").length;

  if (loading) {
    return (
      <div style={styles.container}>
        <AdminSidebar pendingCount={pendingCount} />
        <main style={styles.main}>
          <div style={styles.content}>
            <p style={styles.placeholderText}>로딩 중...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <AdminSidebar pendingCount={pendingCount} />
        <main style={styles.main}>
          <div style={styles.content}>
            <p style={{ color: "#ef4444" }}>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <AdminSidebar pendingCount={pendingCount} />

      <main style={styles.main}>
        {/* 페이지 헤더 */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>인증서 관리</h1>
          <p style={styles.headerSub}>
            봉사활동 인증서를 검토하고 승인 또는 반려하세요.
          </p>
        </div>

        <Routes>
          <Route index element={<Navigate to="certificates" replace />} />
          <Route
            path="certificates"
            element={
              <CertificateList
                certs={certs}
                setCerts={setCerts}
                filter={filter}
                setFilter={setFilter}
              />
            }
          />
          <Route
            path="pending"
            element={
              <CertificateList
                certs={certs}
                setCerts={setCerts}
                filter="pending"
                setFilter={setFilter}
              />
            }
          />
          <Route
            path="users"
            element={
              <div style={styles.content}>
                <p style={styles.placeholderText}>회원 관리 준비 중</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
