import { DELETE, GET, POST, PUT, PUT_MULTIPART } from ".";
import { API_BASE_URL } from "../constants/config";

export async function uploadFile(data){
    return await PUT_MULTIPART(`${API_BASE_URL}/files/upload`, data)
}

export async function uploadFileDec(data){
    return await PUT_MULTIPART(`${API_BASE_URL}/files/decrypt`, data)
}

export async function encryptAndSaveFile(data){
    return await POST(`${API_BASE_URL}/files/upload`, data)
}

export async function decryptAndSaveFile(data){
    return await POST(`${API_BASE_URL}/files/decrypt`, data)
}
export async function saveDecrypt(data){
    return await PUT(`${API_BASE_URL}/files/decrypt/save`, data)
}

export async function getAllFile(userId,encrypted = 1){
    return await GET(`${API_BASE_URL}/files?encrypted=${encrypted}&userid=${userId}`)
}

export async function dashboardExt(userId){
    return await GET(`${API_BASE_URL}/files/dashboard/ext/${userId}`)
}

export async function dashboardData(userId){
    return await GET(`${API_BASE_URL}/files/dashboard/${userId}`)
}

export async function deleteFile(fileId){
    return await DELETE(`${API_BASE_URL}/files/${fileId}`)
}


export async function downloadFile(fileId, encrypted = 1){
    return await GET(`${API_BASE_URL}/files/download/${fileId}/${encrypted}`)
}
