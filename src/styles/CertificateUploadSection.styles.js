export const styles = {
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
  },
  header: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  description: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#6b7280",
  },
  uploadArea: {
    border: "2px dashed #d1d5db",
    borderRadius: "10px",
    padding: "32px",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  uploadAreaActive: {
    borderColor: "#4f46e5",
    backgroundColor: "#eef2ff",
  },
  uploadIcon: {
    width: "48px",
    height: "48px",
    margin: "0 auto 16px",
    color: "#9ca3af",
  },
  uploadText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    margin: "0 0 8px 0",
  },
  uploadSubtext: {
    fontSize: "13px",
    color: "#9ca3af",
    margin: 0,
  },
  fileInput: {
    display: "none",
  },
  filePreview: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    marginTop: "16px",
  },
  fileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a1a",
    wordBreak: "break-all",
  },
  fileSize: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
  },
  removeButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },
  uploadButton: {
    flex: 1,
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  uploadButtonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },
  cancelButton: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  errorMessage: {
    margin: "12px 0 0 0",
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "13px",
  },
  successMessage: {
    margin: "12px 0 0 0",
    padding: "12px 16px",
    backgroundColor: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: "8px",
    color: "#059669",
    fontSize: "13px",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #e5e7eb",
    borderTopColor: "#4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// 파일 크기 포맷팅
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 파일 확장자 추출
export const getFileExtension = (filename) => {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
};

// 허용된 파일 타입
export const ALLOWED_TYPES = ["pdf", "jpg", "jpeg", "png"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
