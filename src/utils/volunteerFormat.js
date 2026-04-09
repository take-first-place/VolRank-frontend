import { regionOptions } from "../constants/volunteerOptions";

export const VOLUNTEER_LIST_STATE_KEY = "volunteerListState";
export const VOLUNTEER_SCROLL_KEY = "volunteerListScroll";

export const getSavedListState = () => {
  try {
    const saved = sessionStorage.getItem(VOLUNTEER_LIST_STATE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const saveListState = (state) => {
  sessionStorage.setItem(VOLUNTEER_LIST_STATE_KEY, JSON.stringify(state));
};

export const getRegionLabel = (regionName, regionCode) => {
  if (regionName && Number.isNaN(Number(regionName))) return regionName;

  const matched = regionOptions.find((option) => option.value === regionCode);
  return matched?.label || "지역 정보 없음";
};

export const formatDate = (value) => {
  if (!value) return "-";
  return String(value).split("T")[0];
};

export const formatStatus = (status) => {
  if (status === "RECRUITING") return "모집중";
  if (status === "CLOSED") return "마감";
  if (status === "FINISHED") return "종료";
  return status || "-";
};
