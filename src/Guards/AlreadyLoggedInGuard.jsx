import { Navigate, Outlet } from "react-router";
import { useUser } from "../context/UserContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useEffect } from "react";

export default function AlreadyLoggedInGuard() {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    useEffect(() => {
        if (user) {
            handleError(null, "You are already logged in.");
        }
    }, [user, handleError]);

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
