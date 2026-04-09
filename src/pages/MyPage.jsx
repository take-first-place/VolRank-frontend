import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import certificateApi from "../api/certificate";
import userApi from "../api/users";
import { useUser } from "../hooks/useUser";
import "../styles/mypage.css";

export const MyPage = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading, error: userError } = useUser();

  const [certificates, setCertificates] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    activityTitle: "",
    organizationName: "",
    place: "",
    startDate: "",
    endDate: "",
    requestedVolunteerHour: "",
    file: null,
  });

  const displayName = useMemo(() => {
    return user?.nickname || user?.username || user?.name || user?.email || "";
  }, [user]);

  const regionName = useMemo(() => {
    return (
      user?.full_region_name ||
      user?.region_name ||
      user?.regionName ||
      user?.region ||
      user?.region_full_name ||
      user?.regionFullName ||
      user?.sidoSigungu ||
      user?.addressRegion ||
      "지역 정보 없음"
    );
  }, [user]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificateApi.getMyCertificates();
      const certificateList = response?.data || [];
      setCertificates(Array.isArray(certificateList) ? certificateList : []);
    } catch (error) {
      console.error("인증서 목록 로딩 실패:", error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);
      const response = await userApi.getMyPageSummary();
      setSummary(response?.data?.data || null);
    } catch (error) {
      console.error("마이페이지 요약 로딩 실패:", error);
      setSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "startDate" || name === "endDate") {
      const normalizedValue = value.slice(0, 10);

      setForm((prev) => ({
        ...prev,
        [name]: normalizedValue,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      file: selectedFile,
    }));
  };

  const resetForm = () => {
    setForm({
      activityTitle: "",
      organizationName: "",
      place: "",
      startDate: "",
      endDate: "",
      requestedVolunteerHour: "",
      file: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    const {
      activityTitle,
      organizationName,
      place,
      startDate,
      endDate,
      requestedVolunteerHour,
      file,
    } = form;

    if (
      !activityTitle.trim() ||
      !organizationName.trim() ||
      !place.trim() ||
      !startDate ||
      !endDate ||
      !requestedVolunteerHour ||
      !file
    ) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("activityTitle", activityTitle);
      formData.append("organizationName", organizationName);
      formData.append("place", place);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("requestedVolunteerHour", requestedVolunteerHour);
      formData.append("certificate", file);

      await certificateApi.createCertificate(formData);

      alert("인증서 업로드 성공");
      resetForm();
      fetchCertificates();
      fetchSummary();
    } catch (error) {
      console.error("인증서 업로드 실패:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "인증서 업로드에 실패했습니다.";

      alert(message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchSummary();
  }, []);

  if (userLoading) {
    return <div className="mypage-container">로딩 중...</div>;
  }

  if (userError) {
    return (
      <div className="mypage-container">사용자 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <div className="mypage-page">
      <div className="mypage-container">
        <section className="mypage-header-card">
          <div className="mypage-back-button-wrap">
            <button
              type="button"
              className="mypage-back-button"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </button>
          </div>

          <div className="mypage-header-top">
            <div>
              <h1 className="mypage-title">마이페이지</h1>
              <p className="mypage-subtitle">
                내 정보와 인증서 제출 현황을 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mypage-user-card">
            <div className="mypage-user-main">
              <div>
                <h2 className="mypage-user-name">
                  {displayName ? `${displayName}님` : "회원님"}
                </h2>
              </div>
            </div>

            <div className="mypage-user-info-grid mypage-user-info-grid-3">
              <div className="mypage-info-box">
                <span className="mypage-info-label">이메일</span>
                <strong className="mypage-info-value">
                  {user?.email || "-"}
                </strong>
              </div>

              <div className="mypage-info-box">
                <span className="mypage-info-label">지역</span>
                <strong className="mypage-info-value">{regionName}</strong>
              </div>

              <div className="mypage-info-box">
                <span className="mypage-info-label">총 봉사 시간</span>
                <strong className="mypage-info-value">
                  {summaryLoading
                    ? "로딩 중..."
                    : `${summary?.totalVolunteerHour ?? 0}시간`}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <div className="mypage-grid">
          <section className="mypage-card">
            <div className="mypage-card-header">
              <h2>봉사 인증서 업로드</h2>
              <p>봉사 활동 정보를 입력하고 인증서 파일을 첨부하세요.</p>
            </div>

            <div className="mypage-form-grid">
              <div className="mypage-form-group">
                <label htmlFor="activityTitle">봉사활동명</label>
                <input
                  id="activityTitle"
                  name="activityTitle"
                  type="text"
                  value={form.activityTitle}
                  onChange={handleChange}
                  placeholder="예: 복지관 행사 운영 보조"
                />
              </div>

              <div className="mypage-form-group">
                <label htmlFor="organizationName">기관명</label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={form.organizationName}
                  onChange={handleChange}
                  placeholder="예: 서대문구체육회"
                />
              </div>

              <div className="mypage-form-group mypage-form-group-full">
                <label htmlFor="place">활동 장소</label>
                <input
                  id="place"
                  name="place"
                  type="text"
                  value={form.place}
                  onChange={handleChange}
                  placeholder="예: 서대문문화체육회관 수영장"
                />
              </div>

              <div className="mypage-form-group">
                <label htmlFor="startDate">시작일</label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mypage-form-group">
                <label htmlFor="endDate">종료일</label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mypage-form-group">
                <label htmlFor="requestedVolunteerHour">봉사시간</label>
                <input
                  id="requestedVolunteerHour"
                  name="requestedVolunteerHour"
                  type="number"
                  min="1"
                  value={form.requestedVolunteerHour}
                  onChange={handleChange}
                  placeholder="예: 4"
                />
              </div>

              <div className="mypage-form-group">
                <label htmlFor="certificateFile">인증서 파일</label>
                <input
                  id="certificateFile"
                  ref={fileInputRef}
                  className="mypage-file-input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mypage-actions">
              <button
                type="button"
                className="mypage-primary-button"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "업로드 중..." : "인증서 업로드"}
              </button>
            </div>
          </section>

          <section className="mypage-card">
            <div className="mypage-card-header">
              <h2>내 인증서 목록</h2>
              <p>제출 상태와 반려 사유를 확인할 수 있습니다.</p>
            </div>

            {loading ? (
              <p className="mypage-empty-text">
                인증서 목록을 불러오는 중입니다.
              </p>
            ) : certificates.length === 0 ? (
              <p className="mypage-empty-text">등록된 인증서가 없습니다.</p>
            ) : (
              <ul className="mypage-certificate-list">
                {certificates.map((cert) => {
                  const certificateId = cert?.id;
                  const title = cert?.activity_title || "봉사활동명 없음";
                  const organizationName = cert?.organization_name || "";
                  const status = cert?.status || "PENDING";
                  const fileUrl = cert?.file_url || "";
                  const rejectedReason = cert?.rejected_reason || "";

                  return (
                    <li key={certificateId} className="mypage-certificate-item">
                      <div className="mypage-certificate-top">
                        <strong>{title}</strong>
                        <span
                          className={`mypage-status-badge mypage-status-${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="mypage-certificate-meta">
                        <span>{organizationName}</span>
                      </div>

                      {fileUrl ? (
                        <div className="mypage-certificate-link">
                          <a
                            href={`http://localhost:3000${fileUrl}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            파일 보기
                          </a>
                        </div>
                      ) : null}

                      {status === "REJECTED" && rejectedReason ? (
                        <p className="mypage-rejected-reason">
                          반려 사유: {rejectedReason}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
