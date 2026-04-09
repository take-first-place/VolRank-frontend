const VolunteerDetailInfoGrid = ({ data, formatDate, formatStatus }) => {
  return (
    <div className="volunteer-detail-info-grid">
      <div className="volunteer-detail-info-item">
        <span className="label">봉사기간</span>
        <strong>
          {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
        </strong>
      </div>

      <div className="volunteer-detail-info-item">
        <span className="label">모집기간</span>
        <strong>
          {formatDate(data.recruit_start_at)} ~{" "}
          {formatDate(data.recruit_end_at)}
        </strong>
      </div>

      <div className="volunteer-detail-info-item">
        <span className="label">봉사장소</span>
        <strong>{data.place || "-"}</strong>
      </div>

      <div className="volunteer-detail-info-item">
        <span className="label">모집인원</span>
        <strong>{data.recruit_count || 0}명</strong>
      </div>

      <div className="volunteer-detail-info-item">
        <span className="label">봉사분야</span>
        <strong>{data.volunteer_type || "-"}</strong>
      </div>

      <div className="volunteer-detail-info-item">
        <span className="label">상태</span>
        <strong>{formatStatus(data.status)}</strong>
      </div>
    </div>
  );
};

export default VolunteerDetailInfoGrid;
