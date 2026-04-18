import axios from "axios";

// Create instance

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true, // important for cookies
    headers: {
        "Content-Type": "application/json"
    }
})

 

export default API;