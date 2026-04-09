import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminCertificates, reviewCertificate } from "../api/admin";
import AdminCertificateCard from "../components/admin/AdminCertificateCard";
import {
  filterCertificates,
  getStatusCounts,
  sortCertificates,
} from "../utils/adminCertificateUtils";
import "../styles/adminPage.css";
import "../styles/adminPageResponsive.css";

const STATUS_TABS = [
  { key: "ALL", label: "전체" },
  { key: "PENDING", label: "대기" },
  { key: "APPROVED", label: "승인" },
  { key: "REJECTED", label: "반려" },
];

const SORT_OPTIONS = [
  { key: "submitted_at", label: "제출일" },
  { key: "reviewed_at", label: "검토일" },
];

function AdminPage() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortField, setSortField] = useState("submitted_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [reviewLoadingId, setReviewLoadingId] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const response = await getAdminCertificates();
      const list = response?.data?.certificates || response?.data || [];

      setCertificates(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("관리자 인증서 목록 조회 실패:", error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const statusCounts = useMemo(() => {
    return getStatusCounts(certificates);
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    const filtered = filterCertificates({
      certificates,
      activeTab,
      searchKeyword,
    });

    return sortCertificates({
      list: filtered,
      sortField,
      sortOrder,
    });
  }, [certificates, activeTab, searchKeyword, sortField, sortOrder]);

  const handleReview = async (certificateId, status) => {
    try {
      const rejectedReason =
        status === "REJECTED" ? window.prompt("반려 사유를 입력해주세요.") : "";

      if (status === "REJECTED" && !rejectedReason?.trim()) {
        return;
      }

      setReviewLoadingId(certificateId);

      await reviewCertificate({
        certificateId,
        status,
        rejectedReason: rejectedReason?.trim() || "",
      });

      await fetchCertificates();
    } catch (error) {
      console.error(`인증서 ${status} 처리 실패:`, error);
    } finally {
      setReviewLoadingId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-back-button"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
          <h1 className="admin-page-title">관리자 페이지</h1>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">인증서 관리</h2>
            <p className="admin-panel-subtitle">
              상태별 조회, 검색, 날짜 정렬이 가능합니다.
            </p>
          </div>

          <div className="admin-tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`admin-tab-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                <span className="admin-tab-count">
                  {statusCounts[tab.key] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="admin-filter-bar">
            <div className="admin-search-box">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="이메일, 활동명, 기관명, 파일명 검색"
                className="admin-search-input"
              />
            </div>

            <div className="admin-sort-controls">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="admin-select"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="admin-select"
              >
                <option value="desc">내림차순</option>
                <option value="asc">오름차순</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="admin-empty-message">목록을 불러오는 중입니다.</p>
          ) : filteredCertificates.length === 0 ? (
            <p className="admin-empty-message">
              조건에 맞는 인증서가 없습니다.
            </p>
          ) : (
            <div className="admin-certificate-list">
              {filteredCertificates.map((item) => (
                <AdminCertificateCard
                  key={item.id}
                  item={item}
                  reviewLoadingId={reviewLoadingId}
                  onReview={handleReview}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
