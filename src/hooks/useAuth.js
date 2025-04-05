import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useErrorHandler } from './useErrorHandler';

export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext
    const { handleError } = useErrorHandler();

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
            handleError(err, 'Registration failed.');
            setError(err.message);
        }
    };

    return { register, error };
};

export const useLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext
    const { handleError } = useErrorHandler();

    const login = async (email, password) => {
        try {
            setError(null);
            const userData = await request.loginUser(email, password);
            console.log("User logged in:", userData);

            setUser(userData); // Populate UserContext with full user data
            navigate("/offers");

            return userData;
        } catch (err) {
            handleError(err, 'Login failed.');
            setError(err.message);
        }
    };

    return { login, error };
};

export const useLogout = () => {
    const { clearUser } = useUser();
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const logout = async () => {
        try {
            await request.logoutUser();
            clearUser(); // Use clearUser to ensure a new state reference
            navigate("/"); // Redirect to home page after logout
        } catch (err) {
            handleError(err, 'Logout failed.');
            console.error("Logout error:", err);
        }
    };

    return { logout };
};

export const useDeleteUser = () => {
    const [error, setError] = useState(null);
    const { user, setUser } = useUser(); // Access setUser from UserContext
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const deleteUser = async () => {
        try {
            setError(null);
            await request.deleteUser(user.id); // Assuming you have a deleteUser method in your request module
            setUser(null); // Immediately clear user data in context
            await request.logoutUser(); // Log out the user after deletion
            navigate("/");
        } catch (err) {
            handleError(err, 'Delete user failed.');
            setError(err.message);
        }
    };

    return { deleteUser, error };
};

export const useUpdateUser = () => {
    const { user, setUser } = useUser();
    const { handleError } = useErrorHandler();

    const updateUser = async (updatedData) => {
        try {
            const updatedUser = await request.updateUser(user.id, updatedData);
            setUser({ ...user, ...updatedUser }); // Ensure a new object reference is created
            console.log("User updated successfully:", updatedUser); // Debug log
        } catch (err) {
            handleError(err, 'Update user failed.');
            console.error("Update user error:", err);
        }
    };

    return { updateUser };
};

export const useCreateOffer = () => {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    const create = async (offerData) => {
        try {
            if (!user) {
                throw new Error("User must be logged in to create an offer.");
            }

            offerData.createdAt = new Date().toISOString();
            offerData.creator = user.id; // Ensure only the user ID is stored

            return await request.create(collectionName, offerData);
        } catch (err) {
            handleError(err, 'Create offer failed.');
            console.error("Create offer error:", err);
        }
    };

    return { create };
};

export const useUserById = (userId) => {
    const [userById, setUserById] = useState(null);
    const [error, setError] = useState(null);
    const { handleError } = useErrorHandler();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await request.getUserById(userId);
                setUserById(userData);
            } catch (err) {
                handleError(err, 'Fetch user by ID failed.');
                console.error("Error fetching user:", err);
                setError(err.message);
            }
        };

        fetchUser();
    }, [userId]);

    return { userById , error };
};