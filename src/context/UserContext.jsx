import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
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
                        name: userDoc.data().name || "Unknown", // Add name
                        phone: userDoc.data().phone || "N/A",  // Add phone
                        ...userDoc.data(),
                    });
                } else {
                    setError("User data not found in Firestore.");
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, error, setError }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
