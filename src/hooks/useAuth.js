import { useState } from "react";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext

    const register = async (email, password, additionalData) => {
        try {
            setError(null);
            const user = await request.registerUser(email, password, additionalData);
            console.log("User registered:", user);

            const loggedInUser = await request.loginUser(email, password);
            console.log("User logged in automatically:", loggedInUser);

            setUser(loggedInUser); // Populate UserContext with full user data
            navigate("/offers");

            return loggedInUser;
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message);
        }
    };

    return { register, error };
};

export const useLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext

    const login = async (email, password) => {
        try {
            setError(null);
            const userData = await request.loginUser(email, password);
            console.log("User logged in:", userData);

            setUser(userData); // Populate UserContext with full user data
            navigate("/offers");

            return userData;
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message);
        }
    };

    return { login, error };
};

export const useLogout = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 

    const logout = async () => {
        try {
            setError(null);
            await request.logoutUser();
            setUser(null); 
            setError(null); // Clear error state after successful logout
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
            setError(err.message);
        }
    };

    return { logout, error };
};