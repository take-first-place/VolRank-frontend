import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getRankings } from "../api/ranking";

function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  const [topRankers, setTopRankers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopRankers = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getRankings({
          type: "user",
          period: "daily",
          page: 1
        });

        setTopRankers((data.data ?? []).slice(0,3));
      } catch (err) {
        console.error("홈 랭킹 조회 실패:", err);
        setError("랭킹 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRankers();
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div>
        <h1> 봉사로 변화를 만들어 보세요</h1>
        <p>나에게 맞는 봉사활동을 찾아 참여하고</p>
        <p>봉사 시간을 인증받아 랭킹에 도전하세요</p>
      </div>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>이달의 봉사왕 TOP 3</h2>
          <button onClick={() => navigate("/ranking")}>전체 랭킹 보기</button>
        </div>

        {loading && <p>랭킹 불러오는 중...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && topRankers.length === 0 && (
          <p>표시할 랭킹이 없습니다.</p>
        )}

        {!loading && !error && topRankers.length > 0 && (
          <div>
            {topRankers.map((item, index) => (
              <div key={item.id ?? index}>
                <h3>{item.rank_position ?? index + 1}위</h3>
                <p>닉네임: {item.nickname ?? "이름 없음"}</p>
                <p>봉사시간: {item.total_hours ?? 0}시간</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section></section>
    </Layout>
  );
}
export default Home;
