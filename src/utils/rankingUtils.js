export const getRankIcon = (rank) => {
  if (Number(rank) === 1) return "👑";
  if (Number(rank) === 2) return "🥈";
  if (Number(rank) === 3) return "🥉";
  return null;
};

export const getRegionCodeValue = (item) => {
  return String(item?.regionCode ?? item?.region_code ?? "");
};

export const normalizeRegionItem = (item) => ({
  ...item,
  regionCode: getRegionCodeValue(item),
});

export const normalizeRankingData = (data) => {
  const top100 = data?.top100 || [];
  const myRankFromTop100 =
    top100.find((item) => item?.is_me || item?.isMe) || null;

  return {
    top3: top100.slice(0, 3),
    top100,
    myRank: data?.myRank || myRankFromTop100 || null,
    regionName: data?.regionName || "",
  };
};

export const getRankClassName = (item) => {
  const rank = item?.rankPosition ?? item?.rank_position;

  if (Number(rank) === 1) return "rank-1";
  if (Number(rank) === 2) return "rank-2";
  if (Number(rank) === 3) return "rank-3";

  return "";
};

export const getRankValue = (item, fallback = "") => {
  return item?.rankPosition ?? item?.rank_position ?? fallback;
};

export const getHoursValue = (item) => {
  return item?.totalHours ?? item?.total_hours ?? 0;
};

export const getRegionNameValue = (item, tab) => {
  if (tab === "national") {
    return (
      item?.fullRegionName ??
      item?.full_region_name ??
      item?.regionName ??
      item?.region_name ??
      ""
    );
  }

  if (tab === "sido") {
    return item?.regionName ?? item?.region_name ?? "";
  }

  return "";
};

export const getNicknameValue = (item) => {
  return item?.nickname ?? "";
};

export const getIsMeValue = (item) => {
  return item?.isMe ?? item?.is_me ?? false;
};

export const getEmptyRankingData = () => ({
  top3: [],
  top100: [],
  myRank: null,
  regionName: "",
});

export const isDisplayRegion = (item) => {
  const code = getRegionCodeValue(item);
  return code !== "00";
};
