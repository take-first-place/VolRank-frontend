export const getStatusLabel = (status) => {
  if (status === "PENDING") return "대기";
  if (status === "APPROVED") return "승인";
  if (status === "REJECTED") return "반려";
  return status || "-";
};

export const getStatusClassName = (status) => {
  if (status === "PENDING") return "admin-status pending";
  if (status === "APPROVED") return "admin-status approved";
  if (status === "REJECTED") return "admin-status rejected";
  return "admin-status";
};

export const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getFileName = (fileUrl) => {
  if (!fileUrl) return "-";

  const rawName = fileUrl.split("/").pop() || "";

  try {
    return decodeURIComponent(rawName);
  } catch {
    return rawName;
  }
};

export const getCertificateFileUrl = (fileUrl) => {
  if (!fileUrl) return "";
  if (fileUrl.startsWith("http")) return fileUrl;

  return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}${fileUrl}`;
};

export const getSearchTargetText = (item) => {
  return [
    item.nickname,
    item.email,
    item.activity_title,
    item.organization_name,
    item.rejected_reason,
    getFileName(item.file_url),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

export const getStatusCounts = (certificates) => {
  const counts = {
    ALL: certificates.length,
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
  };

  certificates.forEach((item) => {
    if (counts[item.status] !== undefined) {
      counts[item.status] += 1;
    }
  });

  return counts;
};

export const filterCertificates = ({
  certificates,
  activeTab,
  searchKeyword,
}) => {
  const keyword = searchKeyword.trim().toLowerCase();

  let result = [...certificates];

  if (activeTab !== "ALL") {
    result = result.filter((item) => item.status === activeTab);
  }

  if (keyword) {
    result = result.filter((item) =>
      getSearchTargetText(item).includes(keyword),
    );
  }

  return result;
};

export const sortCertificates = ({ list, sortField, sortOrder }) => {
  return [...list].sort((a, b) => {
    const aTime = a?.[sortField] ? new Date(a[sortField]).getTime() : 0;
    const bTime = b?.[sortField] ? new Date(b[sortField]).getTime() : 0;

    return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
  });
};
