import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
    const [ admin, setAdmin ] = useState(null);
    const [ token, setToken ] = useState(localStorage.getItem("admin_token"));
    const navigate = useNavigate();

    const signIn = (adminData, adminToken) => {
        setAdmin(adminData);
        setToken(adminToken);
        localStorage.setItem("admin_token", adminToken);
    }
    const signOutForAdmin = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem("admin_token");
        navigate("/sign-in");
    }

    return (
        <AdminContext.Provider value={ {admin, token, signIn, signOutForAdmin} }>
            { children }
        </AdminContext.Provider>
    );
}