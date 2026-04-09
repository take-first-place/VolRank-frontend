import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/volunteers/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error("봉사활동 상세 조회 실패:", err);
        alert("데이터를 불러오는데 실패했습니다.");
        navigate("/volunteers");
      }
    };
    fetchDetail();
  }, [id]);

  if (!data) return <div>로딩 중...</div>;

  return (
    <div className="detail-contailer" style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto"
    }}>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>{data.title}</h1>
        <p style={{ color: '#666' }}>{data.organization_name} | {data.region_name}</p>
      </header>

      <section className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div><strong>봉사기간:</strong> {data.start_date} ~ {data.end_date}</div>
        <div><strong>모집기간:</strong> {data.recruit_start_at} ~ {data.recruit_end_at}</div>
        <div><strong>봉사장소:</strong> {data.place}</div>
        <div><strong>모집인원:</strong> {data.recruit_count}명</div>
        <div><strong>봉사분야:</strong> {data.volunteer_type}</div>
        <div><strong>상태:</strong> 
          <span style={{ 
            padding: '4px 8px', 
            borderRadius: '4px', 
            backgroundColor: data.status === 'RECRUITING' ? '#e3f2fd' : '#f5f5f5',
            color: data.status === 'RECRUITING' ? '#1976d2' : '#9e9e9e'
          }}>
            {data.status === 'RECRUITING' ? '모집중' : '마감'}
          </span>
        </div>
      </section>

      <article style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>상세 내용</h3>
        {/* API에서 오는 HTML 태그나 줄바꿈 처리 */}
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          {data.description}
        </div>
      </article>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{
          padding: '12px 30px',
          backgroundColor: '#383838',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
        onClick={() => {
          if (data?.external_url) {
            window.open(data.external_url, "_blank", "noopener,noreferrer");
          } else {
            alert("신청 가능한 외부 페이지가 없습니다.");
          }
        }}>
          신청하기
        </button>
      </div>
    </div>
  )
};

export default VolunteerDetail;
