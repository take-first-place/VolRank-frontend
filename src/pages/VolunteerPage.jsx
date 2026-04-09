import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getVolunteers } from "../api/volunteer";
import "../styles/volunteerPage.css";

function VolunteerPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);

  const regionOptions = [
    { label: "전체", value: "" },
    { label: "서울", value: "11" },
    { label: "경기", value: "41" },
    { label: "부산", value: "26" },
    { label: "인천", value: "28" },
    { label: "대전", value: "30" },
    { label: "대구", value: "27" },
    { label: "광주", value: "29" },
  ];

  const categoryOptions = [
    { label: "전체", value: "" },
    { label: "복지", value: "생활편의지원" },
    { label: "환경", value: "주거환경" },
    { label: "교육", value: "교육" },
    { label: "문화", value: "문화행사" },
    { label: "의료", value: "보건의료" },
    { label: "동물보호", value: "동물보호" },
  ];

  const fetchVolunteers = () => {
    setLoading(true);

    getVolunteers({
      page: 1,
      size: 10,
      keyword,
      region_code: region,
      volunteer_type: category,
    })
      .then((res) => {
        const items = res.data?.data?.data || [];
        setVolunteers(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        console.log("조회 실패:", err);
        setVolunteers([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="volunteer-page">
        
        {/* 상단 */}
        <div className="volunteer-hero">
          <h1 className="volunteer-title">봉사활동 찾기</h1>
          <p className="volunteer-subtitle">
            나에게 맞는 봉사활동을 검색하고 참여해보세요
          </p>
        </div>

        {/* 검색 + 필터 */}
        <div className="volunteer-search-panel">

          <input
            className="volunteer-search-input"
            placeholder="검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchVolunteers();
            }}
          />

          <div className="volunteer-filter-grid">
            
            {/* 지역 */}
            <div>
              <p className="volunteer-filter-label">지역</p>
              <div className="volunteer-chip-list">
                {regionOptions.map((r) => (
                  <button
                    key={r.value || "all"}
                    className={`volunteer-chip ${region === r.value ? "active" : ""}`}
                    onClick={() => setRegion(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 카테고리 */}
            <div>
              <p className="volunteer-filter-label">카테고리</p>
              <div className="volunteer-chip-list">
                {categoryOptions.map((c) => (
                  <button
                    key={c.value || "all"}
                    className={`volunteer-chip ${category === c.value ? "active" : ""}`}
                    onClick={() => setCategory(c.value)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 결과 개수 */}
        <p className="volunteer-result-count">
          총 {volunteers.length}개의 봉사활동을 찾았습니다
        </p>

        {/* 목록 */}
        {loading ? (
          <div className="volunteer-empty-box">
            불러오는 중...
          </div>
        ) : volunteers.length > 0 ? (
          <div className="volunteer-card-list">
            {volunteers.map((item) => (
              <div key={item.id} className="volunteer-card" onClick={() => navigate(`/volunteers/${item.id}`)}>

                <h3 className="volunteer-card-title">
                  {item.title || "-"}
                </h3>

                <span className="volunteer-card-category">
                  {item.volunteer_type || "카테고리"}
                </span>

                <div className="volunteer-card-meta">
                  <p>📍 {item.region_name || item.region_code}</p>
                  <p>
                    🕒 {item.start_date || "-"} / {item.act_begin_time || "-"}
                  </p>
                </div>

                <div className="volunteer-card-bottom">
                  <span>{item.recruit_count || 0}명</span>
                  <span>{item.status || "모집중"}</span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="volunteer-empty-box">
            조건에 맞는 봉사활동이 없습니다
          </div>
        )}

      </div>
    </Layout>
  );
}

export default VolunteerPage;
