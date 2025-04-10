import { Navigate, Outlet } from "react-router";
import { useUser } from "../context/UserContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useEffect } from "react";

export default function AuthGuard() {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    useEffect(() => {
        if (!user) {
            handleError(null, "You must be logged in to access this page.");
        }
    }, [user, handleError]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
