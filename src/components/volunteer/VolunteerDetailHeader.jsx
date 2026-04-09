const VolunteerDetailHeader = ({ data, onBack, formatStatus }) => {
  return (
    <div className="volunteer-detail-header">
      <button type="button" className="volunteer-back-button" onClick={onBack}>
        목록으로 돌아가기
      </button>

      <div className="volunteer-detail-title-row">
        <span
          className={`volunteer-status-badge ${String(data.status || "").toLowerCase()}`}
        >
          {formatStatus(data.status)}
        </span>
      </div>

      <h1 className="volunteer-detail-title">{data.title}</h1>

      <p className="volunteer-detail-subtitle">
        {data.organization_name || "-"} · {data.region_name || "지역 정보 없음"}
      </p>
    </div>
  );
};

export default VolunteerDetailHeader;
