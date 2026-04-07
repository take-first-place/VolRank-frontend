import api from "./axios";


export const approveUser = () => {
    return api.post("/admin/approve/${id}");
};

export const  rejectUser = () =>{
    return api.post("/admin/reject/${id}");
};

export const  pendingUser = () =>{
    return api.post("/admin/pending/${id}");
};

export const getCertificates = () =>{
    return api.get("/admin/Certificates/${id}");
};