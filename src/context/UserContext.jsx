import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const updateUser = async (userData) => {
        try {
            // Update the user in Firebase
            const userDocRef = doc(db, "users", user.id);
            await setDoc(userDocRef, userData, { merge: true });

            // Fetch the latest user data from Firebase
            const updatedUserDoc = await getDoc(userDocRef);
            if (updatedUserDoc.exists()) {
                const updatedUser = { id: user.id, ...updatedUserDoc.data() };
                setUser(updatedUser); // Update the context with the latest user data
                console.log("Updated user in context:", updatedUser); // Debug log
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
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, clearUser, error, setError }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
