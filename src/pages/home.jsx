import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getNationalRanking } from "../api/ranking";
import "../styles/home.css";

const getRankValue = (item, fallback = "") => {
  return item?.rankPosition ?? item?.rank_position ?? fallback;
};

const getHoursValue = (item) => {
  return item?.totalHours ?? item?.total_hours ?? 0;
};

const getNicknameValue = (item) => {
  return item?.nickname ?? "";
};

const getRegionNameValue = (item) => {
  return (
    item?.fullRegionName ??
    item?.full_region_name ??
    item?.regionName ??
    item?.region_name ??
    ""
  );
};

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [top3, setTop3] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTop3Ranking = async () => {
    try {
      setLoading(true);

      const response = await getNationalRanking();
      const top100 = response?.data?.data?.top100 || [];

      setTop3(top100.slice(0, 3));
    } catch (error) {
      console.error("메인 전국 TOP 3 조회 실패:", error);
      setTop3([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTop3Ranking();
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="home-page">
        <section className="home-hero">
          <p className="home-badge">VolRank</p>
          <h1 className="home-title">봉사활동 랭킹을 한눈에 확인하세요</h1>
          <p className="home-subtitle">
            누적 승인 봉사시간을 기준으로 전국 랭킹을 확인하고, 다양한
            봉사활동에 참여해보세요.
          </p>

          <div className="home-button-group">
            {!isLoggedIn ? (
              <>
                <button
                  className="home-button primary"
                  onClick={() => navigate("/login")}
                >
                  로그인하러 가기
                </button>
                <button
                  className="home-button secondary"
                  onClick={() => navigate("/signup")}
                >
                  회원가입하기
                </button>
              </>
            ) : (
              <button
                className="home-button primary"
                onClick={() => navigate("/ranking")}
              >
                랭킹 보러 가기
              </button>
            )}
          </div>
        </section>

        <section className="home-ranking-section">
          <div className="home-section-header">
            <h2>전국 TOP 3</h2>
            <button
              className="home-link-button"
              onClick={() => navigate("/ranking")}
            >
              전체 랭킹 보기
            </button>
          </div>

          {loading ? (
            <p className="home-message">불러오는 중...</p>
          ) : top3.length === 0 ? (
            <p className="home-message">표시할 전국 랭킹 정보가 없습니다.</p>
          ) : (
            <div className="podium">
              {top3[1] && (
                <div className="podium-item second">
                  <div className="podium-card">
                    <p className="podium-medal">🥈</p>
                    <p className="podium-rank">{getRankValue(top3[1], 2)}위</p>
                    <p className="podium-name">{getNicknameValue(top3[1])}</p>
                    {getRegionNameValue(top3[1]) && (
                      <p className="podium-region">
                        {getRegionNameValue(top3[1])}
                      </p>
                    )}
                    <p className="podium-hours">{getHoursValue(top3[1])}시간</p>
                  </div>
                  <div className="podium-base second-base">2</div>
                </div>
              )}

              {top3[0] && (
                <div className="podium-item first">
                  <div className="podium-card champion">
                    <p className="podium-medal">👑</p>
                    <p className="podium-rank">{getRankValue(top3[0], 1)}위</p>
                    <p className="podium-name">{getNicknameValue(top3[0])}</p>
                    {getRegionNameValue(top3[0]) && (
                      <p className="podium-region">
                        {getRegionNameValue(top3[0])}
                      </p>
                    )}
                    <p className="podium-hours">{getHoursValue(top3[0])}시간</p>
                  </div>
                  <div className="podium-base first-base">1</div>
                </div>
              )}

              {top3[2] && (
                <div className="podium-item third">
                  <div className="podium-card">
                    <p className="podium-medal">🥉</p>
                    <p className="podium-rank">{getRankValue(top3[2], 3)}위</p>
                    <p className="podium-name">{getNicknameValue(top3[2])}</p>
                    {getRegionNameValue(top3[2]) && (
                      <p className="podium-region">
                        {getRegionNameValue(top3[2])}
                      </p>
                    )}
                    <p className="podium-hours">{getHoursValue(top3[2])}시간</p>
                  </div>
                  <div className="podium-base third-base">3</div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
