import { Navigate, Outlet } from "react-router";
import { useUser } from "../context/UserContext";

export default function AlreadyLoggedInGuard() {
    const { user } = useUser(); 

    if (user) {
        return <Navigate to="/offers" />;
    }

    return <Outlet />;
}
