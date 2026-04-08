import { useEffect, useState } from "react";
import { reviewCertificate, getPendingCertificates } from "../api/admin";

const AdminCertificate = () => {
  const [list, setList] = useState([]);
  const [reasons, setReasons] = useState({});

  const fetchAdmin = async () => {
    const res = await getPendingCertificates();
    return res.data.data || [];
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchAdmin();
      setList(data);
    };

    load();
  }, []);

  // input 변경 (id 기준)
  const handleChange = (id, value) => {
    setReasons((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 승인
  const handleApprove = async (id) => {
    await reviewCertificate(id, "APPROVED", "승인");
    fetchAdmin();
  };

  // 거절
  const handleReject = async (id) => {
    const reason = reasons[id];

    if (!reason || !reason.trim()) {
      alert("거절 사유 입력하세요");
      return;
    }

    await reviewCertificate(id, "REJECTED", reason);
    fetchAdmin();
  };

  return (
    <div className="card">
      <h2>인증서 승인 관리</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>유저ID</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="4">데이터가 없습니다.</td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.certificateId}>
                <td>{item.certificateId}</td>
                <td>{item.userId}</td>
                <td>{item.status}</td>

                <td>
                  <div className="row">
                    <button onClick={() => handleApprove(item.certificateId)}>
                      승인
                    </button>

                    <button onClick={() => handleReject(item.certificateId)}>
                      거절
                    </button>

                    <input
                      type="text"
                      placeholder="거절 사유"
                      value={reasons[item.certificateId] || ""}
                      onChange={(e) =>
                        handleChange(item.certificateId, e.target.value)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCertificate;
