import { useState } from "react";
import Layout from "../components/Layout";

function VolunteerPage({ isLoggedIn }) {
    const [keyword, setKeyword] = useState("");
    const [region, setRegion] = useState("");
    const [category, setCategory] = useState("");

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
                        />
                        <button onClick ={() => console.log("검색: ", keyword)}>
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
                        <p className="mypage-empty-text">
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default VolunteerPage;