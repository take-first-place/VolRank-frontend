import {
  getHoursValue,
  getNicknameValue,
  getRankClassName,
  getRankIcon,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function MyRankSection({ myRank, tab, shouldShowRegion }) {
  if (!myRank) {
    return (
      <section className="ranking-section ranking-card-section">
        <h2 className="ranking-section-title">내 랭킹</h2>
        <p className="ranking-message">내 랭킹 정보가 없습니다.</p>
      </section>
    );
  }

  const displayRank = getRankValue(myRank);
  const rankClassName = getRankClassName(myRank);
  const rankIcon = getRankIcon(displayRank);
  const regionName = getRegionNameValue(myRank, tab);

  return (
    <section className="ranking-section ranking-card-section">
      <h2 className="ranking-section-title">내 랭킹</h2>

      <div className={`ranking-my-rank-card ${rankClassName}`}>
        <div className="ranking-my-rank-left">
          <div className="ranking-my-rank-rank">
            {rankIcon && <span className="ranking-rank-icon">{rankIcon}</span>}
            <span className="ranking-my-rank-number">{displayRank}위</span>
          </div>

          <div className="ranking-my-rank-info">
            <p className="ranking-my-rank-name">{getNicknameValue(myRank)}</p>
            {shouldShowRegion && regionName && (
              <p className="ranking-my-rank-region">{regionName}</p>
            )}
          </div>
        </div>

        <div className="ranking-my-rank-right">
          <span className="ranking-my-rank-label">누적 승인 봉사시간</span>
          <strong className="ranking-my-rank-hours">
            {getHoursValue(myRank)}시간
          </strong>
        </div>
      </div>
    </section>
  );
}

export default MyRankSection;
