import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getNationalRanking, getRegionalRanking } from "../api/ranking";
import { getSidos, getSigungus } from "../api/region";
import RankingTabs from "../components/ranking/RankingTabs";
import RankingFilter from "../components/ranking/RankingFilter";
import Top3Section from "../components/ranking/Top3Section";
import MyRankSection from "../components/ranking/MyRankSection";
import RankingDetailSection from "../components/ranking/RankingDetailSection";
import {
  getEmptyRankingData,
  isDisplayRegion,
  normalizeRankingData,
  normalizeRegionItem,
} from "../utils/rankingUtils";
import "../styles/ranking.css";

function RankingPage({ isLoggedIn }) {
  const [tab, setTab] = useState("national");
  const [showDetail, setShowDetail] = useState(false);

  const [sidos, setSidos] = useState([]);
  const [sigungus, setSigungus] = useState([]);

  const [selectedSidoCode, setSelectedSidoCode] = useState("");
  const [selectedSigunguCode, setSelectedSigunguCode] = useState("");

  const [rankingData, setRankingData] = useState(getEmptyRankingData());

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

  const fetchRanking = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      if (tab === "national") {
        response = await getNationalRanking();
      }

      if (tab === "sido") {
        if (!selectedSidoCode) {
          setRankingData(getEmptyRankingData());
          return;
        }

        response = await getRegionalRanking(selectedSidoCode);
      }

      if (tab === "sigungu") {
        if (!selectedSigunguCode) {
          setRankingData(getEmptyRankingData());
          return;
        }

        response = await getRegionalRanking(selectedSigunguCode);
      }

      const normalized = normalizeRankingData(response.data.data);
      setRankingData(normalized);
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
      setError("랭킹 정보를 불러오지 못했습니다.");
      setRankingData(getEmptyRankingData());
    } finally {
      setLoading(false);
    }
  }, [tab, selectedSidoCode, selectedSigunguCode]);

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
  }, [fetchRanking]);

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
            <RankingTabs tab={tab} onChangeTab={setTab} />

            <RankingFilter
              tab={tab}
              sidos={sidos}
              sigungus={sigungus}
              selectedSidoCode={selectedSidoCode}
              selectedSigunguCode={selectedSigunguCode}
              onChangeSido={setSelectedSidoCode}
              onChangeSigungu={setSelectedSigunguCode}
              regionLoading={regionLoading}
            />

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
            <Top3Section
              top3={rankingData.top3}
              tab={tab}
              shouldShowRegion={shouldShowRegion}
              onClickDetail={() => setShowDetail(true)}
            />

            <MyRankSection
              myRank={rankingData.myRank}
              tab={tab}
              shouldShowRegion={shouldShowRegion}
            />
          </>
        )}

        {!loading && !error && showDetail && (
          <RankingDetailSection
            top100={rankingData.top100}
            tab={tab}
            shouldShowRegion={shouldShowRegion}
            onClickBack={() => setShowDetail(false)}
          />
        )}
      </div>
    </Layout>
  );
}

export default RankingPage;
