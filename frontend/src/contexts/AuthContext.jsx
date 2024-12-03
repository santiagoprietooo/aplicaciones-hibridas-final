import { useState, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(localStorage.getItem("token"));

    const signIn = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("token", userToken);
    }
    const signOut = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={ {user, token, signIn, signOut} }>
            { children }
        </AuthContext.Provider>
    );
}