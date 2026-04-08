function RankingFilter({
  tab,
  sidos,
  sigungus,
  selectedSidoCode,
  selectedSigunguCode,
  onChangeSido,
  onChangeSigungu,
  regionLoading,
}) {
  if (tab !== "sido" && tab !== "sigungu") {
    return null;
  }

  return (
    <div className="ranking-filter-section">
      <div className="ranking-filter-box">
        <label>시/도</label>
        <select
          value={selectedSidoCode}
          onChange={(e) => onChangeSido(e.target.value)}
        >
          {sidos.map((item) => (
            <option key={`sido-${item.regionCode}`} value={item.regionCode}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {tab === "sigungu" && (
        <div className="ranking-filter-box">
          <label>시/군/구</label>
          <select
            value={selectedSigunguCode}
            onChange={(e) => onChangeSigungu(e.target.value)}
            disabled={regionLoading || sigungus.length === 0}
          >
            {sigungus.length === 0 ? (
              <option value="">시/군/구 없음</option>
            ) : (
              sigungus.map((item) => (
                <option
                  key={`sigungu-${item.regionCode}`}
                  value={item.regionCode}
                >
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}
    </div>
  );
}

export default RankingFilter;
