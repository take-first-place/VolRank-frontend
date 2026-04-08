import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getNationalRanking, getRegionalRanking } from "../api/ranking";
import { getSidos, getSigungus } from "../api/region";
import "../styles/ranking.css";

const getRegionCodeValue = (item) => {
  return String(item?.regionCode ?? item?.region_code ?? "");
};

const normalizeRegionItem = (item) => ({
  ...item,
  regionCode: getRegionCodeValue(item),
});

const normalizeRankingData = (data) => {
  const top100 = data?.top100 || [];
  const myRankFromTop100 =
    top100.find((item) => item?.is_me || item?.isMe) || null;

  return {
    top3: top100.slice(0, 3),
    top100,
    myRank: data?.myRank || myRankFromTop100 || null,
    regionName: data?.regionName || "",
  };
};

const getRankValue = (item, fallback = "") => {
  return item?.rankPosition ?? item?.rank_position ?? fallback;
};

const getHoursValue = (item) => {
  return item?.totalHours ?? item?.total_hours ?? 0;
};

const getRegionNameValue = (item, tab) => {
  if (tab === "national") {
    return (
      item?.fullRegionName ??
      item?.full_region_name ??
      item?.regionName ??
      item?.region_name ??
      ""
    );
  }

  if (tab === "sido") {
    return item?.regionName ?? item?.region_name ?? "";
  }

  return "";
};

const getNicknameValue = (item) => {
  return item?.nickname ?? "";
};

const getIsMeValue = (item) => {
  return item?.isMe ?? item?.is_me ?? false;
};

function RankingPage({ isLoggedIn }) {
  const [tab, setTab] = useState("national");
  const [showDetail, setShowDetail] = useState(false);

  const [sidos, setSidos] = useState([]);
  const [sigungus, setSigungus] = useState([]);

  const [selectedSidoCode, setSelectedSidoCode] = useState("");
  const [selectedSigunguCode, setSelectedSigunguCode] = useState("");

  const [rankingData, setRankingData] = useState({
    top3: [],
    top100: [],
    myRank: null,
    regionName: "",
  });

  const [loading, setLoading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [error, setError] = useState("");

  const pageTitle = useMemo(() => {
    if (showDetail) return "TOP 100 상세 랭킹";
    if (tab === "national") return "랭킹";
    if (tab === "sido") return "시/도 랭킹";
    return "시/군/구 랭킹";
  }, [tab, showDetail]);

  const shouldShowRegion = tab === "national" || tab === "sido";

  const isDisplayRegion = (item) => {
    const code = getRegionCodeValue(item);
    return code !== "00";
  };

  const fetchSidos = async () => {
    try {
      const response = await getSidos();
      const data = (response.data.data || []).map(normalizeRegionItem);
      const filteredData = data.filter(isDisplayRegion);

      setSidos(filteredData);

      if (filteredData.length > 0) {
        setSelectedSidoCode((prev) => prev || filteredData[0].regionCode);
      }
    } catch (err) {
      console.error("시/도 조회 실패:", err);
    }
  };

  const fetchSigungus = async (sidoCode) => {
    if (!sidoCode) {
      setSigungus([]);
      setSelectedSigunguCode("");
      return;
    }

    try {
      setRegionLoading(true);

      const response = await getSigungus(sidoCode);
      const data = (response.data.data || []).map(normalizeRegionItem);
      const filteredData = data.filter(isDisplayRegion);

      const sortedData = [...filteredData].sort((a, b) =>
        a.name.localeCompare(b.name, "ko-KR"),
      );

      setSigungus(sortedData);

      if (sortedData.length === 0) {
        setSelectedSigunguCode("");
        return;
      }

      setSelectedSigunguCode((prev) => {
        const exists = sortedData.some((item) => item.regionCode === prev);
        return exists ? prev : sortedData[0].regionCode;
      });
    } catch (err) {
      console.error("시/군/구 조회 실패:", err);
      setSigungus([]);
      setSelectedSigunguCode("");
    } finally {
      setRegionLoading(false);
    }
  };

  const fetchRanking = async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      if (tab === "national") {
        response = await getNationalRanking();
      }

      if (tab === "sido") {
        if (!selectedSidoCode) {
          setRankingData({
            top3: [],
            top100: [],
            myRank: null,
            regionName: "",
          });
          return;
        }

        response = await getRegionalRanking(selectedSidoCode);
      }

      if (tab === "sigungu") {
        if (!selectedSigunguCode) {
          setRankingData({
            top3: [],
            top100: [],
            myRank: null,
            regionName: "",
          });
          return;
        }

        response = await getRegionalRanking(selectedSigunguCode);
      }

      const normalized = normalizeRankingData(response.data.data);
      setRankingData(normalized);
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
      setError("랭킹 정보를 불러오지 못했습니다.");
      setRankingData({
        top3: [],
        top100: [],
        myRank: null,
        regionName: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSidos();
  }, []);

  useEffect(() => {
    if (selectedSidoCode) {
      fetchSigungus(selectedSidoCode);
    }
  }, [selectedSidoCode]);

  useEffect(() => {
    setShowDetail(false);
    fetchRanking();
  }, [tab, selectedSidoCode, selectedSigunguCode]);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="ranking-page">
        <div className="ranking-top-section">
          <h1 className="ranking-title">{pageTitle}</h1>
          <p className="ranking-subtitle">
            누적 승인 봉사시간 기준으로 랭킹을 확인해보세요.
          </p>
        </div>

        {!showDetail && (
          <>
            <div className="ranking-tab-section">
              <button
                className={
                  tab === "national" ? "ranking-tab active" : "ranking-tab"
                }
                onClick={() => setTab("national")}
              >
                전국
              </button>
              <button
                className={
                  tab === "sido" ? "ranking-tab active" : "ranking-tab"
                }
                onClick={() => setTab("sido")}
              >
                시/도
              </button>
              <button
                className={
                  tab === "sigungu" ? "ranking-tab active" : "ranking-tab"
                }
                onClick={() => setTab("sigungu")}
              >
                시/군/구
              </button>
            </div>

            {(tab === "sido" || tab === "sigungu") && (
              <div className="ranking-filter-section">
                <div className="ranking-filter-box">
                  <label>시/도</label>
                  <select
                    value={selectedSidoCode}
                    onChange={(e) => setSelectedSidoCode(e.target.value)}
                  >
                    {sidos.map((item) => (
                      <option
                        key={`sido-${item.regionCode}`}
                        value={item.regionCode}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {tab === "sigungu" && (
                  <div className="ranking-filter-box">
                    <label>시/군/구</label>
                    <select
                      value={selectedSigunguCode}
                      onChange={(e) => setSelectedSigunguCode(e.target.value)}
                      disabled={regionLoading || sigungus.length === 0}
                    >
                      {sigungus.length === 0 ? (
                        <option value="">시/군/구 없음</option>
                      ) : (
                        sigungus.map((item) => (
                          <option
                            key={`sigungu-${item.regionCode}`}
                            value={item.regionCode}
                          >
                            {item.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                )}
              </div>
            )}

            {rankingData.regionName && tab !== "national" && (
              <div className="ranking-current-region">
                현재 기준 지역: {rankingData.regionName}
              </div>
            )}
          </>
        )}

        {loading && <p className="ranking-message">불러오는 중...</p>}
        {error && <p className="ranking-error">{error}</p>}

        {!loading && !error && !showDetail && (
          <>
            <section className="ranking-section">
              <div className="ranking-section-header">
                <h2 className="ranking-section-title">TOP 3</h2>
                <button
                  className="ranking-detail-button"
                  onClick={() => setShowDetail(true)}
                >
                  자세히 보기
                </button>
              </div>

              {rankingData.top3.length === 0 ? (
                <p className="ranking-message">표시할 TOP 3가 없습니다.</p>
              ) : (
                <div className="ranking-top3-list">
                  {rankingData.top3.map((item, index) => {
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
                        <p className="ranking-top3-hours">
                          {getHoursValue(item)}시간
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="ranking-section">
              <h2 className="ranking-section-title">내 랭킹</h2>

              {!rankingData.myRank ? (
                <p className="ranking-message">내 랭킹 정보가 없습니다.</p>
              ) : (
                <div className="ranking-my-rank-box">
                  <p>
                    <strong>순위</strong> {getRankValue(rankingData.myRank)}위
                  </p>
                  <p>
                    <strong>닉네임</strong>{" "}
                    {getNicknameValue(rankingData.myRank)}
                  </p>
                  {shouldShowRegion &&
                    getRegionNameValue(rankingData.myRank, tab) && (
                      <p className="ranking-my-rank-region">
                        <strong>지역</strong>{" "}
                        {getRegionNameValue(rankingData.myRank, tab)}
                      </p>
                    )}
                  <p>
                    <strong>누적 승인 봉사시간</strong>{" "}
                    {getHoursValue(rankingData.myRank)}시간
                  </p>
                </div>
              )}
            </section>
          </>
        )}

        {!loading && !error && showDetail && (
          <section className="ranking-section">
            <div className="ranking-section-header">
              <h2 className="ranking-section-title">TOP 100 상세</h2>
              <button
                className="ranking-detail-button"
                onClick={() => setShowDetail(false)}
              >
                돌아가기
              </button>
            </div>

            {rankingData.top100.length === 0 ? (
              <p className="ranking-message">표시할 랭킹이 없습니다.</p>
            ) : (
              <div className="ranking-list">
                {rankingData.top100.map((item, index) => {
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
        )}
      </div>
    </Layout>
  );
}

export default RankingPage;
