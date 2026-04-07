import {  useEffect, useState } from "react";
import {approveUser, rejectUser, getCertificates} from "../../admin"


const AdminCertificate = () => {
    const [list, setlist] = useState([]);

   const fetchadmin =async () => {
        const res = await getCertificates();
        setlist(res.data);   
    };

useEffect (() => {
    fetchadmin();
    },[]);

  
const handleApprove = async(id) =>{
    await approveUser(id);
    fetchadmin();
}

const handleReject = async(id) => {
    await rejectUser(id);
    fetchadmin();
};


 

return(
    <div className="card">
      <h2>승인관리</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>주소</th>
            <th>제출날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="5">데이터가 없습니다.</td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.submitted_at}</td>
                <td>{item.status}</td>
                <td>
                  <div className="row">
                   <button onClick={() => handleApprove(item.id)}>승인</button>
                    <button onClick={() => handleReject(item.id)}>거부</button>
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