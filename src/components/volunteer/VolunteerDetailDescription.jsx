const VolunteerDetailDescription = ({ description }) => {
  return (
    <div className="volunteer-detail-description">
      <h3>상세 내용</h3>
      <div className="volunteer-detail-description-box">
        {description || "상세 내용이 없습니다."}
      </div>
    </div>
  );
};

export default VolunteerDetailDescription;
