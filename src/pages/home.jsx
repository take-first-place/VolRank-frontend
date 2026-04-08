import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getNationalRanking } from "../api/ranking";
import { useAuth } from "../hooks/useAuth"; // ✅ 추가
import "../styles/home.css";

// 유틸리티 함수
const getRankValue = (item) => item?.rankPosition ?? item?.rank_position ?? "";
const getHoursValue = (item) => item?.totalHours ?? item?.total_hours ?? 0;
const getNickname = (item) => item?.nickname ?? "";
const getRegionName = (item) =>
  item?.fullRegionName ??
  item?.full_region_name ??
  item?.regionName ??
  item?.region_name ??
  "";

export const Home = () => {
  // ✅ 화살표 함수 + isLoggedIn props 제거
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // ✅ Context에서 가져옴
  const [top3, setTop3] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTop3 = async () => {
    try {
      setLoading(true);
      const response = await getNationalRanking();
      const top100 = response?.data?.data?.top100 || [];
      setTop3(top100.slice(0, 3));
    } catch (error) {
      console.error("TOP 3 조회 실패:", error);
      setTop3([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTop3();
  }, []);

  // Podium 아이템 렌더링
  const renderPodiumItem = (item, rank, medal, baseClass) => {
    if (!item) return null;

    return (
      <div className={`podium-item ${baseClass}`}>
        <div className={`podium-card ${rank === 1 ? "champion" : ""}`}>
          <p className="podium-medal">{medal}</p>
          <p className="podium-rank">{getRankValue(item) || rank}위</p>
          <p className="podium-name">{getNickname(item)}</p>
          {getRegionName(item) && (
            <p className="podium-region">{getRegionName(item)}</p>
          )}
          <p className="podium-hours">{getHoursValue(item)}시간</p>
        </div>
        <div className={`podium-base ${baseClass}-base`}>{rank}</div>
      </div>
    );
  };

  return (
    <Layout>
      {" "}
      {/* ✅ isLoggedIn props 제거 */}
      <div className="home-page">
        {/* Hero 섹션 */}
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

        {/* TOP 3 섹션 */}
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
              {renderPodiumItem(top3[1], 2, "🥈", "second")}
              {renderPodiumItem(top3[0], 1, "👑", "first")}
              {renderPodiumItem(top3[2], 3, "🥉", "third")}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
