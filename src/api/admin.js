import api from "./axios";


export const approveUser = (id) => {
    return api.post(`/admin/approve/${id}`);
};

export const  rejectUser = (id) =>{
    return api.post(`/admin/reject/${id}`);
};

export const  pendingUser = (id) =>{
    return api.post(`/admin/pending/${id}`);
};

export const getCertificates = (id) =>{
    return api.get(`/admin/Certificates/${id}`);
};