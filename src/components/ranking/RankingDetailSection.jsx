import {
  getHoursValue,
  getNicknameValue,
  getRankClassName,
  getRankIcon,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function RankingDetailSection({ top100, tab, shouldShowRegion, onClickBack }) {
  return (
    <section className="ranking-section ranking-card-section">
      <div className="ranking-section-header">
        <h2 className="ranking-section-title">TOP 100 상세</h2>
        <button className="ranking-detail-button" onClick={onClickBack}>
          돌아가기
        </button>
      </div>

      {top100.length === 0 ? (
        <p className="ranking-message">표시할 랭킹이 없습니다.</p>
      ) : (
        <div className="ranking-list">
          {top100.map((item, index) => {
            const displayRank = getRankValue(item, index + 1);
            const rankClassName = getRankClassName(item);
            const rankIcon = getRankIcon(displayRank);
            const regionName = getRegionNameValue(item, tab);

            return (
              <div
                className={`ranking-item ${rankClassName}`}
                key={`top100-${item.user_id ?? item.nickname ?? "unknown"}-${displayRank}-${index}`}
              >
                <div className="ranking-item-left">
                  <div className="ranking-item-rank-box">
                    {rankIcon && (
                      <span className="ranking-rank-icon">{rankIcon}</span>
                    )}
                    <p className="ranking-item-rank">{displayRank}위</p>
                  </div>

                  <div>
                    <p className="ranking-item-name">
                      {getNicknameValue(item)}
                    </p>

                    {shouldShowRegion && regionName && (
                      <p className="ranking-item-region">{regionName}</p>
                    )}
                  </div>
                </div>

                <div className="ranking-item-right">
                  <p className="ranking-item-hours">
                    {getHoursValue(item)}시간
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RankingDetailSection;
