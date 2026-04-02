import { useEffect, useState } from "react";
import { getRankings } from "../api/ranking";

const RankingPage = () => {
  const [type, setType] = useState("user");
  const [period, setPeriod] = useState("daily");
  const [page, setPage] = useState(1);

  const [rankingList, setRankingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRankings = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getRankings({
        type,
        period,
        page,
        limit: 10,
      });

      console.log("랭킹 응답:", data);

      // 백엔드 응답 형식에 따라 여기 수정 가능
      // 예: data.data.items 또는 data.rankings
      setRankingList(data.data ?? []);
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
      setError("랭킹 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [type, period, page]);

  return (
    <div style={{ padding: "24px" }}>
      <h1>랭킹</h1>
      <p>봉사활동 참여도를 확인해보세요.</p>

      <div style={{ marginTop: "20px" }}>
        <strong>랭킹 타입</strong>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button onClick={() => setType("user")}>유저별</button>
          <button onClick={() => setType("region")}>지역별</button>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <strong>기간</strong>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button onClick={() => setPeriod("daily")}>일간</button>
          <button onClick={() => setPeriod("weekly")}>주간</button>
          <button onClick={() => setPeriod("monthly")}>월간</button>
          <button onClick={() => setPeriod("yearly")}>연간</button>
        </div>
      </div>

      <div style={{ marginTop: "32px" }}>
        {loading && <p>불러오는 중...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && rankingList.length === 0 && (
          <p>표시할 랭킹이 없습니다.</p>
        )}

        {!loading &&
          !error &&
          rankingList.map((item, index) => (
            <div
              key={item.id ?? index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <p>순위: {item.rank ?? index + 1}</p>
              <p>이름: {item.nickname ?? item.regionName ?? "이름 없음"}</p>
              <p>봉사시간: {item.totalVolunteerHours ?? 0}시간</p>
              <p>봉사횟수: {item.totalVolunteerCount ?? 0}회</p>
            </div>
          ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          이전
        </button>
        <span>{page} 페이지</span>
        <button onClick={() => setPage((prev) => prev + 1)}>다음</button>
      </div>
    </div>
  );
};

export default RankingPage;