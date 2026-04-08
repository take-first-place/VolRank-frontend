import {
  getHoursValue,
  getIsMeValue,
  getNicknameValue,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function RankingDetailSection({ top100, tab, shouldShowRegion, onClickBack }) {
  return (
    <section className="ranking-section">
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
            const rank = getRankValue(item, index + 1);
            const topRankClass = rank <= 3 ? ` rank-${rank}` : "";
            const regionName = getRegionNameValue(item, tab);

            return (
              <div
                className={`${
                  getIsMeValue(item)
                    ? "ranking-item ranking-item-me"
                    : "ranking-item"
                }${topRankClass}`}
                key={`top100-${item.user_id ?? item.nickname ?? "unknown"}-${rank}-${index}`}
              >
                <div className="ranking-item-left">
                  <p className="ranking-item-rank">{rank}위</p>
                  <div>
                    <p className="ranking-item-name">
                      {getNicknameValue(item)}
                      {getIsMeValue(item) && (
                        <span className="ranking-me-badge">나</span>
                      )}
                    </p>
                    {shouldShowRegion && regionName && (
                      <p className="ranking-item-region">{regionName}</p>
                    )}
                  </div>
                </div>

                <div className="ranking-item-right">
                  <p>{getHoursValue(item)}시간</p>
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
