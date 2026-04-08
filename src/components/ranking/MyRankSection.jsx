import {
  getHoursValue,
  getNicknameValue,
  getRankValue,
  getRegionNameValue,
} from "../../utils/rankingUtils";

function MyRankSection({ myRank, tab, shouldShowRegion }) {
  return (
    <section className="ranking-section">
      <h2 className="ranking-section-title">내 랭킹</h2>

      {!myRank ? (
        <p className="ranking-message">내 랭킹 정보가 없습니다.</p>
      ) : (
        <div className="ranking-my-rank-box">
          <p>
            <strong>순위</strong> {getRankValue(myRank)}위
          </p>
          <p>
            <strong>닉네임</strong> {getNicknameValue(myRank)}
          </p>
          {shouldShowRegion && getRegionNameValue(myRank, tab) && (
            <p className="ranking-my-rank-region">
              <strong>지역</strong> {getRegionNameValue(myRank, tab)}
            </p>
          )}
          <p>
            <strong>누적 승인 봉사시간</strong> {getHoursValue(myRank)}시간
          </p>
        </div>
      )}
    </section>
  );
}

export default MyRankSection;
