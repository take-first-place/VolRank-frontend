import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import VolunteerDetailHeader from "../components/volunteer/VolunteerDetailHeader";
import VolunteerDetailInfoGrid from "../components/volunteer/VolunteerDetailInfoGrid";
import VolunteerDetailDescription from "../components/volunteer/VolunteerDetailDescription";
import { formatDate, formatStatus } from "../utils/volunteerFormat";
import "../styles/volunteerPage.css";

function VolunteerDetailPage({ isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/volunteers/${id}`,
        );
        setData(res.data?.data || null);
      } catch (err) {
        console.error("봉사활동 상세 조회 실패:", err);
        alert("데이터를 불러오지 못했습니다.");
        navigate("/volunteers", { replace: true });
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const handleBack = () => {
    if (location.state?.fromList) {
      navigate("/volunteers", {
        state: { restoreScroll: true },
      });
      return;
    }

    navigate("/volunteers");
  };

  if (!data) {
    return (
      <Layout isLoggedIn={isLoggedIn}>
        <div className="volunteer-detail-page">
          <div className="volunteer-empty-box">불러오는 중...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="volunteer-detail-page">
        <div className="volunteer-detail-card">
          <VolunteerDetailHeader
            data={data}
            onBack={handleBack}
            formatStatus={formatStatus}
          />

          <VolunteerDetailInfoGrid
            data={data}
            formatDate={formatDate}
            formatStatus={formatStatus}
          />

          <VolunteerDetailDescription description={data.description} />

          <div className="volunteer-detail-actions">
            <button
              type="button"
              className="volunteer-apply-button"
              onClick={() => {
                if (data.external_url) {
                  window.open(
                    data.external_url,
                    "_blank",
                    "noopener,noreferrer",
                  );
                  return;
                }

                alert("신청 가능한 외부 페이지가 없습니다.");
              }}
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VolunteerDetailPage;
