import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AdminContext } from "../contexts/AdminContext";

export const AdminRoute = ({ children }) => {
    const { token } = useContext(AdminContext);
    return token ? children : <Navigate to="*" />
}