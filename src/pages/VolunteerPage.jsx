import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getVolunteers } from "../api/volunteer";
import { getSidos, getSigungus } from "../api/region";
import VolunteerFilterSection from "../components/volunteer/VolunteerFilterSection";
import VolunteerCardList from "../components/volunteer/VolunteerCardList";
import VolunteerPagination from "../components/volunteer/VolunteerPagination";
import {
  getSavedListState,
  saveListState,
  VOLUNTEER_SCROLL_KEY,
} from "../utils/volunteerFormat";
import "../styles/volunteerPage.css";

function VolunteerPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const savedState = getSavedListState();

  const [keyword, setKeyword] = useState(savedState?.keyword || "");
  const [selectedSido, setSelectedSido] = useState(
    savedState?.selectedSido || "",
  );
  const [selectedSigungu, setSelectedSigungu] = useState(
    savedState?.selectedSigungu || "",
  );
  const [category, setCategory] = useState(savedState?.category || "");
  const [status, setStatus] = useState(savedState?.status || "");
  const [page, setPage] = useState(savedState?.page || 1);
  const [size] = useState(10);

  const [sidoOptions, setSidoOptions] = useState([]);
  const [sigunguOptions, setSigunguOptions] = useState([]);

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const resultsRef = useRef(null);
  const firstLoadRef = useRef(true);
  const pendingScrollModeRef = useRef(null);

  const normalizeRegionItems = (items) => {
    if (!Array.isArray(items)) return [];

    return items.filter(
      (item) =>
        item &&
        item.region_code &&
        item.name &&
        item.name !== "기본" &&
        item.name !== "00" &&
        item.name.trim() !== "",
    );
  };

  const persistCurrentState = ({
    nextKeyword = keyword,
    nextSelectedSido = selectedSido,
    nextSelectedSigungu = selectedSigungu,
    nextCategory = category,
    nextStatus = status,
    nextPage = page,
  } = {}) => {
    saveListState({
      keyword: nextKeyword,
      selectedSido: nextSelectedSido,
      selectedSigungu: nextSelectedSigungu,
      category: nextCategory,
      status: nextStatus,
      page: nextPage,
    });
  };

  const fetchSidoOptions = async () => {
    try {
      const res = await getSidos();
      const items = normalizeRegionItems(res.data?.data);
      setSidoOptions(items);
    } catch (err) {
      console.error("시도 목록 조회 실패:", err);
      setSidoOptions([]);
    }
  };

  const fetchSigunguOptions = async (sidoCode) => {
    if (!sidoCode) {
      setSigunguOptions([]);
      return;
    }

    try {
      const res = await getSigungus(sidoCode);
      const items = normalizeRegionItems(res.data?.data);
      setSigunguOptions(items);
    } catch (err) {
      console.error("시군구 목록 조회 실패:", err);
      setSigunguOptions([]);
    }
  };

  const fetchVolunteers = async ({
    nextPage = page,
    nextKeyword = keyword,
    nextSelectedSido = selectedSido,
    nextSelectedSigungu = selectedSigungu,
    nextCategory = category,
    nextStatus = status,
    scrollMode = null,
  } = {}) => {
    try {
      setLoading(true);
      pendingScrollModeRef.current = scrollMode;

      const regionCode = nextSelectedSigungu || nextSelectedSido || "";

      const res = await getVolunteers({
        page: nextPage,
        size,
        keyword: nextKeyword,
        region_code: regionCode,
        volunteer_type: nextCategory,
        status: nextStatus,
      });

      const payload = res.data?.data || {};
      const items = Array.isArray(payload.data) ? payload.data : [];

      setVolunteers(items);
      setTotal(Number(payload.total) || 0);
      setTotalPages(Number(payload.totalPages) || 1);

      persistCurrentState({
        nextKeyword,
        nextSelectedSido,
        nextSelectedSigungu,
        nextCategory,
        nextStatus,
        nextPage,
      });
    } catch (err) {
      console.error("봉사활동 조회 실패:", err);
      setVolunteers([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSidoOptions();
  }, []);

  useEffect(() => {
    const shouldRestoreFromDetail = location.state?.restoreScroll;
    const restoredScroll = sessionStorage.getItem(VOLUNTEER_SCROLL_KEY);

    if (firstLoadRef.current) {
      firstLoadRef.current = false;

      fetchVolunteers({
        nextPage: savedState?.page || 1,
        nextKeyword: savedState?.keyword || "",
        nextSelectedSido: savedState?.selectedSido || "",
        nextSelectedSigungu: savedState?.selectedSigungu || "",
        nextCategory: savedState?.category || "",
        nextStatus: savedState?.status || "",
        scrollMode:
          shouldRestoreFromDetail && restoredScroll ? "restore-detail" : null,
      });

      if (savedState?.selectedSido) {
        fetchSigunguOptions(savedState.selectedSido);
      }
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    const mode = pendingScrollModeRef.current;
    if (!mode) return;

    if (mode === "restore-detail") {
      const savedScroll = Number(
        sessionStorage.getItem(VOLUNTEER_SCROLL_KEY) || 0,
      );

      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScroll,
          behavior: "auto",
        });

        sessionStorage.removeItem(VOLUNTEER_SCROLL_KEY);
        pendingScrollModeRef.current = null;
      });

      return;
    }

    if (mode === "results-top") {
      window.requestAnimationFrame(() => {
        if (!resultsRef.current) return;

        const top =
          resultsRef.current.getBoundingClientRect().top + window.scrollY - 110;

        window.scrollTo({
          top,
          behavior: "smooth",
        });

        pendingScrollModeRef.current = null;
      });
    }
  }, [loading, volunteers]);

  const handleSearch = () => {
    setPage(1);
    fetchVolunteers({
      nextPage: 1,
      nextKeyword: keyword,
      nextSelectedSido: selectedSido,
      nextSelectedSigungu: selectedSigungu,
      nextCategory: category,
      nextStatus: status,
      scrollMode: "results-top",
    });
  };

  const handleReset = () => {
    setKeyword("");
    setSelectedSido("");
    setSelectedSigungu("");
    setCategory("");
    setStatus("");
    setSigunguOptions([]);
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: "",
      nextSelectedSido: "",
      nextSelectedSigungu: "",
      nextCategory: "",
      nextStatus: "",
      scrollMode: "results-top",
    });
  };

  const handleSidoChange = async (value) => {
    setSelectedSido(value);
    setSelectedSigungu("");
    setPage(1);
    await fetchSigunguOptions(value);
  };

  const handleSigunguChange = (value) => {
    setSelectedSigungu(value);
    setPage(1);
  };

  const handleCategoryClick = (value) => {
    setCategory(value);
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: keyword,
      nextSelectedSido: selectedSido,
      nextSelectedSigungu: selectedSigungu,
      nextCategory: value,
      nextStatus: status,
      scrollMode: "results-top",
    });
  };

  const handleStatusClick = (value) => {
    setStatus(value);
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: keyword,
      nextSelectedSido: selectedSido,
      nextSelectedSigungu: selectedSigungu,
      nextCategory: category,
      nextStatus: value,
      scrollMode: "results-top",
    });
  };

  const handlePageChange = (nextPage) => {
    if (nextPage === page) return;

    setPage(nextPage);

    fetchVolunteers({
      nextPage,
      nextKeyword: keyword,
      nextSelectedSido: selectedSido,
      nextSelectedSigungu: selectedSigungu,
      nextCategory: category,
      nextStatus: status,
      scrollMode: "results-top",
    });
  };

  const handleMoveDetail = (id) => {
    sessionStorage.setItem(VOLUNTEER_SCROLL_KEY, String(window.scrollY));
    persistCurrentState();

    navigate(`/volunteers/${id}`, {
      state: {
        fromList: true,
      },
    });
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="volunteer-page">
        <div className="volunteer-hero">
          <h1 className="volunteer-title">봉사활동 찾기</h1>
          <p className="volunteer-subtitle">
            나에게 맞는 봉사활동을 검색하고 참여해보세요
          </p>
        </div>

        <VolunteerFilterSection
          keyword={keyword}
          setKeyword={setKeyword}
          selectedSido={selectedSido}
          selectedSigungu={selectedSigungu}
          category={category}
          status={status}
          sidoOptions={sidoOptions}
          sigunguOptions={sigunguOptions}
          onSearch={handleSearch}
          onReset={handleReset}
          onSidoChange={handleSidoChange}
          onSigunguChange={handleSigunguChange}
          onCategoryClick={handleCategoryClick}
          onStatusClick={handleStatusClick}
        />

        <div ref={resultsRef} className="volunteer-results-anchor" />

        <div className="volunteer-result-bar">
          <p className="volunteer-result-count">총 {total}개의 봉사활동</p>
          <p className="volunteer-result-page">
            {page} / {totalPages} 페이지
          </p>
        </div>

        {loading ? (
          <div className="volunteer-empty-box">불러오는 중...</div>
        ) : volunteers.length > 0 ? (
          <>
            <VolunteerCardList
              volunteers={volunteers}
              onMoveDetail={handleMoveDetail}
            />

            <VolunteerPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="volunteer-empty-box">
            조건에 맞는 봉사활동이 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VolunteerPage;
