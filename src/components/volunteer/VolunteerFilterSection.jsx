import {
  categoryOptions,
  regionOptions,
} from "../../constants/volunteerOptions";

const VolunteerFilterSection = ({
  keyword,
  setKeyword,
  region,
  category,
  onSearch,
  onReset,
  onRegionClick,
  onCategoryClick,
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
          <div className="volunteer-chip-list">
            {regionOptions.map((item) => (
              <button
                key={item.value || "all-region"}
                type="button"
                className={`volunteer-chip ${region === item.value ? "active" : ""}`}
                onClick={() => onRegionClick(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="volunteer-filter-label">카테고리</p>
          <div className="volunteer-chip-list">
            {categoryOptions.map((item) => (
              <button
                key={item.value || "all-category"}
                type="button"
                className={`volunteer-chip ${category === item.value ? "active" : ""}`}
                onClick={() => onCategoryClick(item.value)}
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
