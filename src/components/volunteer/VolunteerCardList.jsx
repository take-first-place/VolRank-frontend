import {
  formatDate,
  formatStatus,
  getRegionLabel,
} from "../../utils/volunteerFormat";

const VolunteerCardList = ({ volunteers, onMoveDetail }) => {
  return (
    <div className="volunteer-card-list">
      {volunteers.map((item) => (
        <button
          key={item.id}
          type="button"
          className="volunteer-card"
          onClick={() => onMoveDetail(item.id)}
        >
          <div className="volunteer-card-top">
            <span className="volunteer-card-category">
              {item.volunteer_type || "카테고리"}
            </span>

            <span
              className={`volunteer-status-badge ${String(
                item.status || "",
              ).toLowerCase()}`}
            >
              {formatStatus(item.status)}
            </span>
          </div>

          <h3 className="volunteer-card-title">{item.title || "-"}</h3>

          <div className="volunteer-card-meta">
            <p>기관 {item.organization_name || "-"}</p>
            <p>지역 {getRegionLabel(item.region_name, item.region_code)}</p>
            <p>
              기간 {formatDate(item.start_date)} ~ {formatDate(item.end_date)}
            </p>
            <p>장소 {item.place || "-"}</p>
          </div>

          <div className="volunteer-card-bottom">
            <span>모집 {item.recruit_count || 0}명</span>
            <span>자세히 보기</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default VolunteerCardList;
