const categoryOptions = [
  { label: "생활편의지원", value: "생활편의지원" },
  { label: "주거환경", value: "주거환경" },
  { label: "교육", value: "교육" },
  { label: "상담", value: "상담" },
  { label: "보건의료", value: "보건의료" },
  { label: "농어촌봉사", value: "농어촌봉사" },
  { label: "문화행사", value: "문화행사" },
  { label: "환경보호", value: "환경보호" },
];

const statusOptions = [
  { label: "전체", value: "" },
  { label: "모집중", value: "RECRUITING" },
  { label: "종료", value: "ENDED" },
];

const VolunteerFilterSection = ({
  keyword,
  setKeyword,
  selectedSido,
  selectedSigungu,
  category,
  status,
  sidoOptions,
  sigunguOptions,
  onSearch,
  onReset,
  onSidoChange,
  onSigunguChange,
  onCategoryClick,
  onStatusClick,
}) => {
  return (
    <div className="volunteer-search-panel">
      <div className="volunteer-search-row">
        <input
          className="volunteer-search-input"
          placeholder="봉사활동 제목 또는 내용을 검색해보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <button
          type="button"
          className="volunteer-action-button primary"
          onClick={onSearch}
        >
          검색
        </button>

        <button
          type="button"
          className="volunteer-action-button secondary"
          onClick={onReset}
        >
          초기화
        </button>
      </div>

      <div className="volunteer-filter-grid">
        <div>
          <p className="volunteer-filter-label">지역</p>

          <div className="volunteer-select-row">
            <select
              className="volunteer-filter-select"
              value={selectedSido}
              onChange={(e) => onSidoChange(e.target.value)}
            >
              <option value="">전체</option>
              {sidoOptions.map((item, index) => (
                <option
                  key={`${item.region_code}-${index}`}
                  value={item.region_code}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="volunteer-filter-select"
              value={selectedSigungu}
              onChange={(e) => onSigunguChange(e.target.value)}
              disabled={!selectedSido}
            >
              <option value="">전체</option>
              {sigunguOptions.map((item, index) => (
                <option
                  key={`${item.region_code}-${index}`}
                  value={item.region_code}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="volunteer-filter-label">카테고리</p>
          <div className="volunteer-chip-list">
            {categoryOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`volunteer-chip ${category === item.value ? "active" : ""}`}
                onClick={() => onCategoryClick(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="volunteer-filter-label">모집 상태</p>
          <div className="volunteer-chip-list">
            {statusOptions.map((item) => (
              <button
                key={item.value || "all-status"}
                type="button"
                className={`volunteer-chip ${status === item.value ? "active" : ""}`}
                onClick={() => onStatusClick(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerFilterSection;
