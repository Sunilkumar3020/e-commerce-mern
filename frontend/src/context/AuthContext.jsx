import { createContext, useContext, useState } from "react";
import API from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    //Register 
    const register = async (data) => {
        try {
            const res = await API.post('/auth/register', data);
            setUser(res.data)
        } catch (error) {
            throw error
        }
    }
    //emailCheck 

    const emailCheck = async (data) => {
        try {
            const res = await API.post('/auth/emailCheck', data)
        } catch (error) {
            throw error
        }
    }
    //login
    const login = async (data) => {
        try {
            const res = await API.post('/auth/login', data)
            setUser(res.data);
        } catch (error) {
            throw error
        }
    }


    // logout

    const logout = async () => {
        try {
            await API.post('/auth/logout');
            setUser(null)
            na
        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)