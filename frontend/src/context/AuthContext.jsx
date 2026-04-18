import { createContext, useContext, useState } from "react";
import API from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    //login
    const login = async (data) => {
        const res = await API.post('/auth/login', data)
        setUser(res.data);
    }

    //Register 
    const register = async (data) => {
        const res = await API.post('/auth/register', data);
        setUser(res.data)
    }

    // logout

    const logout = async () => {
        await API.post('/auth/logout');
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)