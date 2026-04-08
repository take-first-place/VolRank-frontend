import {Navigate} from 'react';


function Sidebar(){
    <div className="sidebar"
         style={{height:"calc(100vh - 50px)" , width:"25%"}}>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <ul className ="sidebarlist">
                    <li className="sidebarlist1">
                        <button onClick={()=> Navigate("/admin")}>메인</button>
                    </li>
                    <li className="sidebarlist2">
                        <button onClick={()=> Navigate("/AdminCertificate")}>조회/승인</button>
                    </li>
                   
                </ul>
            </div>

        </div>
        
    </div>
}
export default Sidebar;