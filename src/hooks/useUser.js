import { useState, useEffect, useCallback } from "react";
import { getUserById } from "../api/users"; // ✅ getUserById 사용
import { decodeToken } from "../utils/auth";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 토큰에서 ID 추출 → API 조회
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const decoded = decodeToken(token);
    console.log("decoded token:", decoded);

    if (!decoded?.id) {
      setError("토큰에서 사용자 ID를 찾을 수 없습니다");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getUserById(decoded.id); // ✅ ID로 조회
      console.log("user API response:", response.data);
      setUser(response.data.data);
      setError(null);
    } catch (err) {
      console.error("fetchUser error:", err);
      setError(err.response?.data?.message || "사용자 정보 조회 실패");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return { user, loading, error, refetch: fetchUser, clearUser };
};

export default useUser;
