import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_API } from "../constants";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    // update the localstorage when current user is changed
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    const login = async (inputs) => {
        const res = await axios.post(`${BACKEND_API}/auth/login`, inputs);
        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post(`${BACKEND_API}/auth/logout`);
        setCurrentUser(null);
    }



    return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
}