import axios from "axios";
import { API_BASE_URL } from "./config";

//Axios Instance
const axiosy = axios.create({
    baseURL : API_BASE_URL,
    withCredentials:true, // to send cookies with requests
})

//to Register a User
export const signUp = async (userData) =>{
    try{
        const response = await axiosy.post("/api/auth/signup", userData);
        return response.data;
    }catch(error){
    throw error.response ? error.response.data : error.message;
}
}

//to Login a User
export const logIn = async (userData) =>{
    try{
        const response = await axiosy.post("/api/auth/login", userData);
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }       
}

// Get current authenticated user (uses cookie or Authorization header)
export const getCurrentUser = async () => {
    try {
        const response = await axiosy.get('/api/user/current');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
