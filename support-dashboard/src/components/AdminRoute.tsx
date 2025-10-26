import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

    useEffect(() => {
        console.log("Checking AdminRoute...");

        const token = sessionStorage.getItem("token");
        console.log("Token from sessionStorage:", token);

        if (!token) {
            console.log("No token found");
            setIsAdminUser(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            console.log("Decoded payload:", payload);

            if (payload.role === "MANAGER") {
                console.log("User is admin!");
                setIsAdminUser(true);
            } else {
                console.log("User is NOT admin!");
                setIsAdminUser(false);
            }
        } catch (error) {
            console.log("Error decoding token:", error);
            setIsAdminUser(false);
        }
    }, []);

    if (isAdminUser === null) {
        // אפשר להציג loading קטן בזמן בדיקה
        return <div>Loading...</div>;
    }

    if (!isAdminUser) {
        console.log("Redirecting to home...");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;