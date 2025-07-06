import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = async (email, password) => {
            const response = await API.post("/auth/login", { email, password });
            const token= response.data.data.token;
            localStorage.setItem("token", token);
            setUser(response.data.data.user);
    }
    const logout = async () => {
        await API.post("/auth/logout");
        localStorage.removeItem("token");
        setUser(null);
    };
    const fetchProfile = async () => {
        try {
            const response = await API.get("/auth/profile");
            setUser(response.data.data.user);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setUser(null);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchProfile();
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
       
}   
