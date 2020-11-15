import { DELETE, GET, POST, PUT_MULTIPART } from ".";
import { API_BASE_URL } from "../constants/config";

export async function uploadFile(data){
    return await PUT_MULTIPART(`${API_BASE_URL}/files/upload`, data)
}

export async function encryptAndSaveFile(data){
    return await POST(`${API_BASE_URL}/files/upload`, data)
}

export async function getAllFile(){
    return await GET(`${API_BASE_URL}/files`)
}

export async function deleteFile(fileId){
    return await DELETE(`${API_BASE_URL}/files/${fileId}`)
}


export async function downloadFile(fileId, encrypted = 1){
    return await GET(`${API_BASE_URL}/files/download/${fileId}/${encrypted}`)
}
