import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const updateUser = async (userData) => {
        try {
            if (!user || !user.id) {
                return;
            }

            if (!userData || typeof userData !== "object") {
                console.warn("The profile has been deleted thus the object is null instead!"); // Graceful handling
                return;
            }

            // Update the user in Firebase
            const userDocRef = doc(db, "users", user.id);
            await setDoc(userDocRef, userData, { merge: true });

            // Fetch the latest user data from Firebase
            const updatedUserDoc = await getDoc(userDocRef);
            if (updatedUserDoc.exists()) {
                const updatedUser = { id: user.id, ...updatedUserDoc.data() };
                setUser(updatedUser); // Update the context with the latest user data
            }
        } catch (error) {
            console.error("Error updating user in context:", error);
        }
    };

    const clearUser = () => {
        setUser(null); // Clear user state with a new reference
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true); // Start loading
            if (firebaseUser) {
                const userDocRef = doc(db, "users", firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUser({
                        id: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: userDoc.data().name,
                        phone: userDoc.data().phone,
                        profilePicture: userDoc.data().profilePicture,
                        savedOffers: userDoc.data().savedOffers,
                        createdAt: userDoc.data().createdAt,
                        ...userDoc.data(),
                    });
                } else {
                    setError("User data not found in Firestore.");
                }
            } else {
                clearUser(); // Clear user state on logout
            }
            setLoading(false); // End loading
        });

        return () => unsubscribe();
    }, []); // Dependency array empty means this effect runs only once on mount

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, clearUser, error, setError, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);