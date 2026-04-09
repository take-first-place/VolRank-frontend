import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getVolunteers } from "../api/volunteer";
import VolunteerFilterSection from "../components/volunteer/VolunteerFilterSection";
import VolunteerCardList from "../components/volunteer/VolunteerCardList";
import VolunteerPagination from "../components/volunteer/VolunteerPagination";
import {
  getSavedListState,
  saveListState,
  VOLUNTEER_LIST_STATE_KEY,
  VOLUNTEER_SCROLL_KEY,
} from "../utils/volunteerFormat";
import "../styles/volunteerPage.css";

function VolunteerPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const savedState = getSavedListState();

  const [keyword, setKeyword] = useState(savedState?.keyword || "");
  const [region, setRegion] = useState(savedState?.region || "");
  const [category, setCategory] = useState(savedState?.category || "");
  const [page, setPage] = useState(savedState?.page || 1);
  const [size] = useState(10);

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const resultsRef = useRef(null);
  const firstLoadRef = useRef(true);
  const pendingScrollModeRef = useRef(null);

  const persistCurrentState = ({
    nextKeyword = keyword,
    nextRegion = region,
    nextCategory = category,
    nextPage = page,
  } = {}) => {
    saveListState({
      keyword: nextKeyword,
      region: nextRegion,
      category: nextCategory,
      page: nextPage,
    });
  };

  const fetchVolunteers = async ({
    nextPage = page,
    nextKeyword = keyword,
    nextRegion = region,
    nextCategory = category,
    scrollMode = null,
  } = {}) => {
    try {
      setLoading(true);
      pendingScrollModeRef.current = scrollMode;

      const res = await getVolunteers({
        page: nextPage,
        size,
        keyword: nextKeyword,
        region_code: nextRegion,
        volunteer_type: nextCategory,
      });

      const payload = res.data?.data || {};
      const items = Array.isArray(payload.data) ? payload.data : [];

      setVolunteers(items);
      setTotal(Number(payload.total) || 0);
      setTotalPages(Number(payload.totalPages) || 1);

      persistCurrentState({
        nextKeyword,
        nextRegion,
        nextCategory,
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
    const shouldRestoreFromDetail = location.state?.restoreScroll;
    const restoredScroll = sessionStorage.getItem(VOLUNTEER_SCROLL_KEY);

    if (firstLoadRef.current) {
      firstLoadRef.current = false;

      fetchVolunteers({
        nextPage: savedState?.page || 1,
        nextKeyword: savedState?.keyword || "",
        nextRegion: savedState?.region || "",
        nextCategory: savedState?.category || "",
        scrollMode:
          shouldRestoreFromDetail && restoredScroll ? "restore-detail" : null,
      });
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
      nextRegion: region,
      nextCategory: category,
      scrollMode: "results-top",
    });
  };

  const handleReset = () => {
    setKeyword("");
    setRegion("");
    setCategory("");
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: "",
      nextRegion: "",
      nextCategory: "",
      scrollMode: "results-top",
    });
  };

  const handleRegionClick = (value) => {
    setRegion(value);
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: keyword,
      nextRegion: value,
      nextCategory: category,
      scrollMode: "results-top",
    });
  };

  const handleCategoryClick = (value) => {
    setCategory(value);
    setPage(1);

    fetchVolunteers({
      nextPage: 1,
      nextKeyword: keyword,
      nextRegion: region,
      nextCategory: value,
      scrollMode: "results-top",
    });
  };

  const handlePageChange = (nextPage) => {
    if (nextPage === page) return;

    setPage(nextPage);

    fetchVolunteers({
      nextPage,
      nextKeyword: keyword,
      nextRegion: region,
      nextCategory: category,
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
          region={region}
          category={category}
          onSearch={handleSearch}
          onReset={handleReset}
          onRegionClick={handleRegionClick}
          onCategoryClick={handleCategoryClick}
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
