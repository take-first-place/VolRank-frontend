import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getVolunteers } from "../api/volunteer";

function VolunteerPage({ isLoggedIn }) {
    const [keyword, setKeyword] = useState("");
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");
    const [volunteers, setVolunteers] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchVolunteers = () => {
        setLoading(true);

        getVolunteers({
            page:1,
            size:10,
            keyword,
            region_code:region,
            volunteer_type: category,
        })
        .then((res) => {
            
            const items = res.data?.data?.data || [];

            setVolunteers(Array.isArray(items) ? items : []);
            setSearched(true);
        })
        .catch((err) => {
            console.log("봉사활동 조회 실패: ", err);
            setVolunteers([]);
            setSearched(true);
        }) 
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    return(
        <Layout isLoggedIn={isLoggedIn}>
            <div className = "mypage">
                <h1 className="mypage-title">봉사활동</h1>
                <p className= "mypage-subtitle">
                    봉사활동 정보를 확인하세요.
                </p>

                <div className="mypage-section">
                    <h2>검색</h2>
                    <div className ="mypage-box">
                        <input type="text" placeholder="봉사활동명을 입력하세요." 
                        value = {keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown ={(e) => {
                            if(e.key === "Enter"){
                                fetchVolunteers();
                            }
                        }}
                        />
                        <button onClick = {fetchVolunteers}>
                            검색
                        </button>
                    </div>
                </div>

                <div className ="mypage-section">
                    <h2>필터</h2>
                    <div className="mypage-box">
                        <select value={region} onChange={(e) => setRegion(e.target.value)}>
                            <option value="">지역 선택</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="부산">부산</option>
                        </select>

                        <select value ={category} onChange ={(e) => setCategory(e.target.value)}>
                            <option value ="">카테고리 선택</option>
                            <option value ="환경">환경</option>
                            <option value ="복지">복지</option>
                        </select>

                        <p>
                            검색어 :{keyword || "없음"} / 지역:{region || "전체"} / 카테고리:{category || "전체"}
                        </p>
                    </div>
                </div>

                <div className="mypage-section">
                    <h2>봉사활동 목록</h2>
                    <div className="mypage-box">
                        {loading ? (
                        <p className="mypage-empty-text">봉사활동 정보를 불러오는 중입니다.</p>
                        ) : volunteers.length > 0 ? (
                            volunteers.map((item) => (
                                <div key = {item.id} className="certificate-item">
                                    <p>봉사명 : {item.title || "-"}</p>
                                    <p>기관명 : {item.organization_name || "-"}</p>
                                    <p>지역: {item.region_name || item.region_code || "-"}</p>
                                    <p>모집기간: {item.recruit_start_at || "-"} ~ {item.recruit_end_at || "-"}</p>
                                    <p>활동기간: {item.start_date || "-"} ~ {item.end_date || "-"}</p>
                                    <p>활동시간: {item.act_begin_time || "-"} ~ {item.act_end_time || "-"}</p>
                                    <p>모집인원: {item.recruit_count || "-"}</p>
                                    <p>상태: {item.status || "-"}</p>
                                    {item.external_url && (
                                        <p>
                                            <a href={item.external_url} target = "_blank" rel = "noreferrer">
                                                상세보기
                                            </a>
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : searched ? (
                            <p className = "mypage-empty-text">조건에 맞는 봉사활동이 없습니다.</p>
                        ) : (
                            <p className = "mypage-empty-text">봉사활동 정보를 불러올 수 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VolunteerPage;