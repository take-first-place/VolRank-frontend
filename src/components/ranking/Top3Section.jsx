import {
  getHoursValue,
  getIsMeValue,
  getNicknameValue,
  getRankClassName,
  getRankIcon,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function Top3Section({ top3, tab, shouldShowRegion, onClickDetail }) {
  return (
    <section className="ranking-section ranking-card-section">
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
            const displayRank = getRankValue(item, index + 1);
            const rankClassName = getRankClassName(item);
            const regionName = getRegionNameValue(item, tab);
            const rankIcon = getRankIcon(displayRank);
            const isMe = getIsMeValue(item);

            return (
              <div
                className={`ranking-top3-card ${rankClassName}${isMe ? " ranking-top3-card-me" : ""}`}
                key={`top3-${item.user_id ?? item.nickname ?? "unknown"}-${displayRank}-${index}`}
              >
                <div className="ranking-rank-badge">
                  {rankIcon && (
                    <span className="ranking-rank-icon">{rankIcon}</span>
                  )}
                  <span className="ranking-top3-rank">{displayRank}위</span>
                </div>

                <p className="ranking-top3-name">
                  {getNicknameValue(item)}
                  {isMe && <span className="ranking-me-badge">MY</span>}
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
