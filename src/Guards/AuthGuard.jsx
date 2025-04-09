import {Navigate, Outlet} from "react-router";
import { useUser } from "../context/UserContext";

export default function AuthGuard() {
    const { user } = useUser(); // Access user from UserContext

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet/>; 
}
