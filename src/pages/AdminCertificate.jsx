import { useEffect, useState } from "react";
import {approveUser, rejectUser, getCertificates} from "../../admin"


const AdminCertificate = () => {
    const [list, setlist] = useState([]);


const fetchadmin = async () => {
    const res = await getCertificates();
    setlist(res.data);

};

useEffect (() => 
    setTimeout(()=>
    fetchadmin()), []); 

const handleApprove = async(id) =>{
    await approveUser(id);
    fetchadmin();
}

const handleReject = async(id) => {
    await rejectUser(id);
    fetchadmin();
};

return(
    <div>
        <h2>승인 관리</h2>
        {list.map((item) => (
            <div key = {item.id}>
            <span> {item.name} </span>
            <button onClick={() => handleApprove(item.id)}>승인</button>
            <button onClick={() => handleReject(item.id)}>반려</button>
    </div>
        ))}
    </div>
    );
};
export default AdminCertificate;