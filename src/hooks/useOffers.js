import { useState, useEffect } from "react";
import { request } from "../utils/request";
import { useUser } from "../context/UserContext";

const collectionName = "offers";

export const useOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        request.getAll(collectionName).then(setOffers);
    }, []);

    return { offers };
};

export const useOffer = (offerId) => {
    const [offer, setOffer] = useState(null);
    const [creator, setCreator] = useState(null); // New state for creator details

    useEffect(() => {
        if (offerId) {
            request.getById(collectionName, offerId)
                .then(async (fetchedOffer) => {
                    setOffer(fetchedOffer);
                    if (typeof fetchedOffer.creator === "string") {
                        // Fetch creator details only if creator is a string (user ID)
                        const creatorData = await request.getById("users", fetchedOffer.creator);
                        setCreator(creatorData);
                    } else {
                        console.error("Invalid creator format in offer:", fetchedOffer.creator);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching offer:", error);
                });
        }
    }, [offerId]);

    return { offer, creator }; // Return both offer and creator
};

export const useCreateOffer = () => {
    const { user } = useUser();

    const create = async (offerData) => {
        if (!user) {
            throw new Error("User must be logged in to create an offer.");
        }

        offerData.createdAt = new Date().toISOString();
        offerData.creator = user.id; // Store only the user ID

        return await request.create(collectionName, offerData);
    };

    return { create };
};

export const useEditOffer = () => {
    const edit = async (offerId, offerData) => {
        if (!offerId || !offerData) {
            throw new Error("offerId and offerData are required for editing an offer.");
        }

        try {
            await request.update(collectionName, offerId, offerData);
            console.log(`Offer with ID ${offerId} has been updated successfully.`);
        } catch (error) {
            console.error("Error updating the offer:", error);
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
            console.log(`Offer with ID ${offerId} has been deleted successfully.`);
        } catch (error) {
            console.error("Error deleting the offer:", error);
            throw error;
        }
    };

    return { remove };
};

export const useLatestOffers = (count = 10) => {
    const [latestOffers, setLatestOffers] = useState([]);

    useEffect(() => {
        request.getLatest(collectionName, count).then(setLatestOffers);
    }, [count]);
    console.log("Latest offers fetched:", latestOffers);
    return { latestOffers };
};

export const useOffersByCategory = (category) => {
    const [offersByCategory, setOffersByCategory] = useState([]);

    useEffect(() => {
        if (category) {
            request.getByCategory(collectionName, category)
                .then(setOffersByCategory)
                .catch((error) => {
                    console.error("Error fetching offers by category:", error);
                });
        }
    }, [category]);

    return { offersByCategory };
};

export const useSaveOffer = () => {
    const { user } = useUser();

    const saveOffer = async (offerId) => {
        if (!user) {
            throw new Error("User must be logged in to save an offer.");
        }

        return await request.saveOffer(offerId, user.id);
    };

    return { saveOffer };
};

export const useSavedOffers = () => {
    const { user } = useUser();
    const [savedOffers, setSavedOffers] = useState([]);

    useEffect(() => {
        if (user) {
            request.getSavedOffers(user.id).then(setSavedOffers);
        }
    }, [user]);

    return { savedOffers };
};
export const useDeleteSavedOffer = () => {
    const { user } = useUser();

    const deleteSavedOffer = async (offerId) => {
        if (!user) {
            throw new Error("User must be logged in to delete a saved offer.");
        }

        return await request.deleteSavedOffer(offerId, user.id);
    };

    return { deleteSavedOffer };
};

export const useGetOffersByUser = () => {
    const { user } = useUser();
    const [userOffers, setUserOffers] = useState([]);

    useEffect(() => {
        if (user) {
            request.getByUser(collectionName, user.id).then(setUserOffers);
        }
    }, [user]);

    return { userOffers };
};

export const useGetOffersByUserId = (userId) => {
    const [userOffers, setUserOffers] = useState([]);

    useEffect(() => {
        if (userId) {
            request.getByUser(collectionName, userId).then(setUserOffers);
        }
    }, [userId]);

    return { userOffers };
};

export const editOffer = async (offerId, offerData) => {
    if (!offerId || !offerData) {
        throw new Error("offerId and offerData are required for editing an offer.");
    }

    try {
        await request.update(collectionName, offerId, offerData);
        console.log(`Offer with ID ${offerId} has been updated successfully.`);
    } catch (error) {
        console.error("Error updating the offer:", error);
        throw error;
    }
}

export const deleteOffer = async (offerId) => {
    if (!offerId) {
        throw new Error("offerId is required for deleting an offer.");
    }

    try {
        await request.delete(collectionName, offerId);
        console.log(`Offer with ID ${offerId} has been deleted successfully.`);
    } catch (error) {
        console.error("Error deleting the offer:", error);
        throw error;
    }
}