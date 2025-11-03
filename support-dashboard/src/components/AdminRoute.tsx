import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setIsAdminUser(false);
            return;
        }
        setIsAdminUser(isAdmin(token));
    }, []);
    if (isAdminUser === null) {
        return <div>Loading...</div>;
    }
    if (!isAdminUser) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default AdminRoute;