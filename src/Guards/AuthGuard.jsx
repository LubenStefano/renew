import {Navigate, Outlet} from "react-router";
import { useUser } from "../context/UserContext";

export default function AuthGuard() {
    const { user } = useUser(); // Access user from UserContext

    console.log("AuthGuard user state:", user); // Debug log

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet/>; 
}
