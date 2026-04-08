function RankingTabs({ tab, onChangeTab }) {
  return (
    <div className="ranking-tab-section">
      <button
        className={tab === "national" ? "ranking-tab active" : "ranking-tab"}
        onClick={() => onChangeTab("national")}
      >
        전국
      </button>
      <button
        className={tab === "sido" ? "ranking-tab active" : "ranking-tab"}
        onClick={() => onChangeTab("sido")}
      >
        시/도
      </button>
      <button
        className={tab === "sigungu" ? "ranking-tab active" : "ranking-tab"}
        onClick={() => onChangeTab("sigungu")}
      >
        시/군/구
      </button>
    </div>
  );
}

export default RankingTabs;
