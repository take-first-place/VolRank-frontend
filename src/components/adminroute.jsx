import React from 'react';
import {Navigate} from 'react-router-dom';

function Adminroute({children}){
    const user = localStorage.setItem("user");

    if(user.role !== "admin"){
        alert("접근권한이 없습니다.");
        return<Navigate to ="/login" replace/>;
    }
    return children;

}
export default Adminroute;