import Sidebar from "../components/admininsidebar";
import{ useEffect, useState} from "react";
import {getMyCertificate} from "../api/adminapi";


function Admin(){
    const [list, setlist] = useState([]);


    const Fetchdata =async() => {
        const res = await getMyCertificate();

        const Pendinglist = res.data.filter(
            (item) => item.status == "pending");
            setlist(...Pendinglist);
    };

     useEffect(()=>{
        Fetchdata();
    }, []);
   

        
    const Adminpage = () => {
    return(
        <div style={{display: "flex"}}>
            <Sidebar/>
            <div>
                    {list.map((list) => (
                        <tr key = {list.id}>
                        <td>{list.name}</td>
                        <td>{list.status}</td>
                        </tr>
                    ))}
                
            </div>
    
        </div>
        
        );
    };

    };

export default Admin;