import {
  getHoursValue,
  getIsMeValue,
  getNicknameValue,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function Top3Section({ top3, tab, shouldShowRegion, onClickDetail }) {
  return (
    <section className="ranking-section">
      <div className="ranking-section-header">
        <h2 className="ranking-section-title">TOP 3</h2>
        <button className="ranking-detail-button" onClick={onClickDetail}>
          자세히 보기
        </button>
      </div>

      {top3.length === 0 ? (
        <p className="ranking-message">표시할 TOP 3가 없습니다.</p>
      ) : (
        <div className="ranking-top3-list">
          {top3.map((item, index) => {
            const rank = getRankValue(item, index + 1);
            const regionName = getRegionNameValue(item, tab);

            return (
              <div
                className={`ranking-top3-card rank-${rank}`}
                key={`top3-${item.user_id ?? item.nickname ?? "unknown"}-${rank}-${index}`}
              >
                <p className="ranking-top3-rank">{rank}위</p>
                <p className="ranking-top3-name">
                  {getNicknameValue(item)}
                  {getIsMeValue(item) && (
                    <span className="ranking-me-badge">나</span>
                  )}
                </p>
                {shouldShowRegion && regionName && (
                  <p className="ranking-top3-region">{regionName}</p>
                )}
                <p className="ranking-top3-hours">{getHoursValue(item)}시간</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Top3Section;
