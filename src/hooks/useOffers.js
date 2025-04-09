import { useState, useEffect, useRef } from "react";
import { request } from "../utils/request";
import { useUser } from "../context/UserContext";
import { useErrorHandler } from './useErrorHandler';
import { showMessage } from "../utils/messageHandler";

const collectionName = "offers";

export const useOffers = () => {
    const [offers, setOffers] = useState();

    const fetchOffers = async (signal) => {
        try {
            const fetchedOffers = await request.getAll(collectionName, signal);
            setOffers(fetchedOffers);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Failed to fetch offers:', error);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchOffers(signal);

        return () => controller.abort(); // Cleanup function
    }, []);

    return { offers, fetchOffers }; // Expose fetchOffers
};

export const useOffer = (offerId) => {
    const [offer, setOffer] = useState(null);
    const [creator, setCreator] = useState(null); // New state for creator details
    const { handleError } = useErrorHandler();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (offerId) {
            request.getById(collectionName, offerId, signal)
                .then(async (fetchedOffer) => {
                    setOffer(fetchedOffer);
                    if (typeof fetchedOffer.creator === "string") {
                        const creatorData = await request.getById("users", fetchedOffer.creator, signal);
                        setCreator(creatorData);
                    }
                })
                .catch((error) => {
                    if (error.name !== 'AbortError') {
                        handleError(error, 'Failed to fetch offer.');
                    }
                });
        }

        return () => controller.abort(); // Cleanup function
    }, [offerId]); // Automatically updates `offer` when `offerId` changes

    return { offer, creator }; // Return both offer and creator
};

export const useCreateOffer = () => {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    const create = async (offerData) => {
        if (!user) {
            throw new Error("User must be logged in to create an offer.");
        }

        offerData.createdAt = new Date().toISOString();
        offerData.creator = user.id; // Store only the user ID
        offerData.creatorPfp = user.profilePicture; // Store the user's profile picture URL

        try {
            const createdOffer = await request.create(collectionName, offerData);
            showMessage("success", "Offer created successfully!", "The offer has been created.");
            return createdOffer;
        } catch (error) {
            handleError(error, "Failed to create offer.");
            throw error; // Re-throw the error after handling
        }
    };

    return { create };
};

//това е хука
export const useEditOffer = () => {
    const edit = async (offerId, offerData) => {
        if (!offerId || !offerData) {
            throw new Error("offerId and offerData are required for editing an offer.");
        }

        try {
            await request.update(collectionName, offerId, offerData);
            showMessage("success", "Offer edited successfully!", "The offer has been edited.");
        } catch (error) {
           useErrorHandler(error, "Failed to edit offer.");
            throw error;
        }
    };

    return { edit };
};

export const useDeleteOffer = () => {
    const remove = async (offerId) => {
        if (!offerId) {
            throw new Error("offerId is required for deleting an offer.");
        }

        try {
            await request.delete(collectionName, offerId);
            showMessage("success", "Offer deleted successfully!", "The offer has been deleted.");
        } catch (error) {
            useErrorHandler(error, "Failed to delete offer.");
            throw error;
        }
    };

    return { remove };
};

export const useLatestOffers = (count = 10) => {
    const [latestOffers, setLatestOffers] = useState([]);
    const hasFetched = useRef(false); // Prevent repeated fetching

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            request.getLatest(collectionName, count).then(setLatestOffers);
        }
    }, [count]);

    return { latestOffers };
};

export const useOffersByCategory = (category) => {
    const [offersByCategory, setOffersByCategory] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (category) {
            request.getByCategory(collectionName, category, signal)
                .then(setOffersByCategory)
                .catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error("Error fetching offers by category:", error);
                    }
                });
        }

        return () => controller.abort(); // Cleanup function
    }, [category]);

    return { offersByCategory };
};

export const useSaveOffer = () => {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    const saveOffer = async (offerId) => {
        if (!user) {
            throw new Error("User must be logged in to save an offer.");
        }

        try {
            await request.saveOffer(offerId, user.id);
            showMessage("success", "Offer saved successfully!", "The offer has been added to your saved list.");
        } catch (error) {
            handleError(error, "Failed to save offer.");
            throw error; // Re-throw the error after handling
        }
    };

    return { saveOffer };
};

export const useSavedOffers = () => {
    const { user } = useUser();
    const [savedOffers, setSavedOffers] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (user) {
            request.getSavedOffers(user.id, signal).then(setSavedOffers).catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching saved offers:", error);
                }
            });
        }

        return () => controller.abort(); // Cleanup function
    }, [user]);

    return { savedOffers };
};

export const useDeleteSavedOffer = () => {
    const { user } = useUser();
    const { handleError } = useErrorHandler();

    const deleteSavedOffer = async (offerId) => {
        if (!user) {
            throw new Error("User must be logged in to delete a saved offer.");
        }

        try {
            await request.deleteSavedOffer(offerId, user.id);
            showMessage("success", "Saved offer deleted successfully!", "The saved offer has been removed.");
        } catch (error) {
            handleError(error, "Failed to delete saved offer.");
            throw error;
        }
    };

    return { deleteSavedOffer };
};

export const useGetOffersByUser = () => {
    const { user } = useUser();
    const [userOffers, setUserOffers] = useState();

    useEffect(() => {
        if (user) {
            request.getByUser(collectionName, user.id).then(setUserOffers);
        }
    }, [user]);

    return { userOffers };
};

export const useGetOffersByUserId = (userId) => {
    const [userOffers, setUserOffers] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (userId) {
            request.getByUser(collectionName, userId, signal).then(setUserOffers).catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching offers by user:", error);
                }
            });
        }

        return () => controller.abort(); // Cleanup function
    }, [userId]);

    return { userOffers };
};

export const editOffer = async (offerId, offerData) => {
    const { handleError } = useErrorHandler();

    if (!offerId || !offerData) {
        throw new Error("offerId and offerData are required for editing an offer.");
    }

    try {
        await request.update(collectionName, offerId, offerData);
        showMessage("success", "Offer edited successfully!", "The offer has been updated.");
    } catch (error) {
        handleError(error, "Failed to edit offer.");
        throw error;
    }
};

export const deleteOffer = async (offerId) => {
    const { handleError } = useErrorHandler();

    if (!offerId) {
        throw new Error("offerId is required for deleting an offer.");
    }

    try {
        await request.delete(collectionName, offerId);
        showMessage("success", "Offer deleted successfully!", "The offer has been removed.");
    } catch (error) {
        handleError(error, "Failed to delete offer.");
        throw error;
    }
};