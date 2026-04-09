import {
  formatDate,
  getCertificateFileUrl,
  getFileName,
  getStatusClassName,
  getStatusLabel,
} from "../../utils/adminCertificateUtils";
import "../../styles/adminCertificateCard.css";

const AdminCertificateCard = ({ item, reviewLoadingId, onReview }) => {
  return (
    <article className="admin-certificate-card">
      <div className="admin-card-header">
        <div>
          <h3 className="admin-card-title">
            {item.activity_title || "활동명 없음"}
          </h3>
        </div>

        <span className={getStatusClassName(item.status)}>
          {getStatusLabel(item.status)}
        </span>
      </div>

      <div className="admin-card-body">
        <div className="admin-info-grid">
          <div className="admin-info-item">
            <span className="admin-info-label">기관명</span>
            <span className="admin-info-value">
              {item.organization_name || "-"}
            </span>
          </div>

          <div className="admin-info-item">
            <span className="admin-info-label">제출자</span>
            <span className="admin-info-value">{item.email || "-"}</span>
          </div>

          <div className="admin-info-item">
            <span className="admin-info-label">제출일</span>
            <span className="admin-info-value">
              {formatDate(item.submitted_at)}
            </span>
          </div>

          <div className="admin-info-item">
            <span className="admin-info-label">검토일</span>
            <span className="admin-info-value">
              {formatDate(item.reviewed_at)}
            </span>
          </div>

          {item.rejected_reason ? (
            <div className="admin-info-item admin-info-item-full">
              <span className="admin-info-label">반려 사유</span>
              <span className="admin-info-value">{item.rejected_reason}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="admin-card-footer">
        <div className="admin-file-action-wrap">
          {item.file_url ? (
            <>
              <a
                href={getCertificateFileUrl(item.file_url)}
                target="_blank"
                rel="noreferrer"
                className="admin-view-button"
              >
                인증서 보기
              </a>
              <span className="admin-inline-file-name">
                {getFileName(item.file_url)}
              </span>
            </>
          ) : (
            <button
              type="button"
              className="admin-view-button disabled"
              disabled
            >
              파일 없음
            </button>
          )}
        </div>

        <div className="admin-action-group">
          {item.status === "PENDING" ? (
            <>
              <button
                type="button"
                className="admin-action-button approve"
                onClick={() => onReview(item.id, "APPROVED")}
                disabled={reviewLoadingId === item.id}
              >
                승인
              </button>
              <button
                type="button"
                className="admin-action-button reject"
                onClick={() => onReview(item.id, "REJECTED")}
                disabled={reviewLoadingId === item.id}
              >
                반려
              </button>
            </>
          ) : (
            <button
              type="button"
              className="admin-view-button disabled"
              disabled
            >
              {item.status === "APPROVED" ? "승인 완료" : "반려 완료"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default AdminCertificateCard;
