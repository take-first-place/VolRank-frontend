import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminCertificates, reviewCertificate } from "../api/admin";
import "../styles/adminPage.css";

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

const getStatusLabel = (status) => {
  if (status === "PENDING") return "대기";
  if (status === "APPROVED") return "승인";
  if (status === "REJECTED") return "반려";
  return status || "-";
};

const getStatusClassName = (status) => {
  if (status === "PENDING") return "admin-status pending";
  if (status === "APPROVED") return "admin-status approved";
  if (status === "REJECTED") return "admin-status rejected";
  return "admin-status";
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getFileName = (fileUrl) => {
  if (!fileUrl) return "-";

  const rawName = fileUrl.split("/").pop() || "";

  try {
    return decodeURIComponent(rawName);
  } catch {
    return rawName;
  }
};

const getCertificateFileUrl = (fileUrl) => {
  if (!fileUrl) return "";
  if (fileUrl.startsWith("http")) return fileUrl;

  return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}${fileUrl}`;
};

const getSearchTargetText = (item) => {
  return [
    item.nickname,
    item.email,
    item.activity_title,
    item.organization_name,
    item.rejected_reason,
    getFileName(item.file_url),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

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
    const counts = {
      ALL: certificates.length,
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
    };

    certificates.forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status] += 1;
      }
    });

    return counts;
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    let result = [...certificates];

    if (activeTab !== "ALL") {
      result = result.filter((item) => item.status === activeTab);
    }

    if (keyword) {
      result = result.filter((item) =>
        getSearchTargetText(item).includes(keyword),
      );
    }

    result.sort((a, b) => {
      const aTime = a?.[sortField] ? new Date(a[sortField]).getTime() : 0;
      const bTime = b?.[sortField] ? new Date(b[sortField]).getTime() : 0;

      return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
    });

    return result;
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
                <article key={item.id} className="admin-certificate-card">
                  <div className="admin-card-header">
                    <div>
                      <h3 className="admin-card-title">
                        {item.activity_title || "활동명 없음"}
                      </h3>
                    </div>

                    <span className={getStatusClassName(item.status)}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>

                  <div className="admin-card-body">
                    <div className="admin-info-grid">
                      <div className="admin-info-item">
                        <span className="admin-info-label">기관명</span>
                        <span className="admin-info-value">
                          {item.organization_name || "-"}
                        </span>
                      </div>

                      <div className="admin-info-item">
                        <span className="admin-info-label">제출자</span>
                        <span className="admin-info-value">
                          {item.email || "-"}
                        </span>
                      </div>

                      <div className="admin-info-item">
                        <span className="admin-info-label">제출일</span>
                        <span className="admin-info-value">
                          {formatDate(item.submitted_at)}
                        </span>
                      </div>

                      <div className="admin-info-item">
                        <span className="admin-info-label">검토일</span>
                        <span className="admin-info-value">
                          {formatDate(item.reviewed_at)}
                        </span>
                      </div>

                      {item.rejected_reason ? (
                        <div className="admin-info-item admin-info-item-full">
                          <span className="admin-info-label">반려 사유</span>
                          <span className="admin-info-value">
                            {item.rejected_reason}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="admin-card-footer">
                    <div className="admin-file-action-wrap">
                      {item.file_url ? (
                        <>
                          <a
                            href={getCertificateFileUrl(item.file_url)}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-view-button"
                          >
                            인증서 보기
                          </a>
                          <span className="admin-inline-file-name">
                            {getFileName(item.file_url)}
                          </span>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="admin-view-button disabled"
                          disabled
                        >
                          파일 없음
                        </button>
                      )}
                    </div>

                    <div className="admin-action-group">
                      {item.status === "PENDING" ? (
                        <>
                          <button
                            type="button"
                            className="admin-action-button approve"
                            onClick={() => handleReview(item.id, "APPROVED")}
                            disabled={reviewLoadingId === item.id}
                          >
                            승인
                          </button>
                          <button
                            type="button"
                            className="admin-action-button reject"
                            onClick={() => handleReview(item.id, "REJECTED")}
                            disabled={reviewLoadingId === item.id}
                          >
                            반려
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="admin-view-button disabled"
                          disabled
                        >
                          {item.status === "APPROVED"
                            ? "승인 완료"
                            : "반려 완료"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
