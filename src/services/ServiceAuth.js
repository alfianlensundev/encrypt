import { PUT, POST, GET } from ".";
import { API_BASE_URL } from "../constants/config";

export async function doSignUp(data){
    return await PUT(`${API_BASE_URL}/auth/users`, data)
}

export async function doLogin(data){
    return await POST(`${API_BASE_URL}/auth/login`, data)
}

export async function getAllUsers(){
    return await GET(`${API_BASE_URL}/auth/users`)
}

export async function doValidateUser(data){
    return await POST(`${API_BASE_URL}/auth/users/validate`, data)
}