import { useState, useRef, useCallback } from "react";
import { certificateApi } from "../api/certificate";
import {
  styles,
  formatFileSize,
  getFileExtension,
  ALLOWED_TYPES,
  MAX_FILE_SIZE,
} from "../styles/CertificateUploadSection.styles";

/**
 * 인증서 업로드 섹션 컴포넌트
 * @param {Object} props
 * @param {number} props.volunteerParticipationId - 봉사 참여 ID
 * @param {Function} props.onUploadSuccess - 업로드 성공 콜백
 * @param {Function} props.onUploadError - 업로드 실패 콜백
 */
function CertificateUploadSection({
  volunteerParticipationId,
  onUploadSuccess,
  onUploadError,
}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  // 파일 검증
  const validateFile = useCallback((selectedFile) => {
    setError(null);
    setSuccess(null);

    if (!selectedFile) {
      return { valid: false, error: "파일을 선택해주세요." };
    }

    // 크기 체크
    if (selectedFile.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `파일 크기는 ${formatFileSize(MAX_FILE_SIZE)} 이하여야 합니다.`,
      };
    }

    // 확장자 체크
    const ext = getFileExtension(selectedFile.name);
    if (!ALLOWED_TYPES.includes(ext)) {
      return {
        valid: false,
        error: `${ALLOWED_TYPES.join(", ")} 파일만 업로드 가능합니다.`,
      };
    }

    return { valid: true };
  }, []);

  // 파일 선택 핸들러
  const handleFileSelect = useCallback(
    (selectedFile) => {
      const validation = validateFile(selectedFile);

      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setFile(selectedFile);
      setError(null);
    },
    [validateFile],
  );

  // input change 핸들러
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
    // 같은 파일 재선택 가능하도록 초기화
    e.target.value = "";
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  // 파일 제거
  const handleRemove = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
  };

  // 업로드
  const handleUpload = async () => {
    if (!file) {
      setError("파일을 선택해주세요.");
      return;
    }

    if (!volunteerParticipationId) {
      setError("봉사 참여 ID가 필요합니다.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("certificate", file);
      formData.append("volunteerParticipationId", volunteerParticipationId);

      const response = await certificateApi.createCertificate(formData);

      setSuccess("인증서가 성공적으로 업로드되었습니다.");
      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "업로드 중 오류가 발생했습니다.";
      setError(errorMessage);

      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // 파일 확장자에 따른 아이콘 텍스트
  const getFileIconText = (filename) => {
    const ext = getFileExtension(filename);
    if (ext === "pdf") return "PDF";
    if (["jpg", "jpeg", "png"].includes(ext)) return "IMG";
    return "FILE";
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.container}>
        <h3 style={styles.header}>인증서 업로드</h3>
        <p style={styles.description}>
          PDF, JPG, PNG 파일만 업로드 가능 (최대 {formatFileSize(MAX_FILE_SIZE)}
          )
        </p>

        {/* 드래그 앤 드롭 영역 */}
        <div
          style={{
            ...styles.uploadArea,
            ...(isDragging ? styles.uploadAreaActive : {}),
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            style={styles.fileInput}
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />

          <svg
            style={styles.uploadIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>

          <p style={styles.uploadText}>클릭하거나 파일을 드래그하여 업로드</p>
          <p style={styles.uploadSubtext}>
            PDF, JPG, PNG (최대 {formatFileSize(MAX_FILE_SIZE)})
          </p>
        </div>

        {/* 파일 미리보기 */}
        {file && (
          <div style={styles.filePreview}>
            <div style={styles.fileIcon}>{getFileIconText(file.name)}</div>
            <div style={styles.fileInfo}>
              <p style={styles.fileName}>{file.name}</p>
              <p style={styles.fileSize}>{formatFileSize(file.size)}</p>
            </div>
            <button style={styles.removeButton} onClick={handleRemove}>
              제거
            </button>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && <div style={styles.errorMessage}>{error}</div>}

        {/* 성공 메시지 */}
        {success && <div style={styles.successMessage}>{success}</div>}

        {/* 버튼 그룹 */}
        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.uploadButton,
              ...(isUploading || !file ? styles.uploadButtonDisabled : {}),
            }}
            onClick={handleUpload}
            disabled={isUploading || !file}
          >
            {isUploading ? "업로드 중..." : "업로드"}
          </button>

          {file && (
            <button style={styles.cancelButton} onClick={handleRemove}>
              취소
            </button>
          )}
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isUploading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner} />
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default CertificateUploadSection;
