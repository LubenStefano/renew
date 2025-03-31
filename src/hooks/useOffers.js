import { useState, useEffect } from "react";
import { request } from "../utils/request";

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
    console.log("Offer ID:", offerId);

    useEffect(() => {
        if (offerId) {
            request.getById(collectionName, offerId)
                .then((fetchedOffer) => {
                    setOffer(fetchedOffer);
                })
                .catch((error) => {
                    console.error("Error fetching offer:", error);
                });
        }
    }, [offerId]);

    console.log("Offer fetched:", offer);
    
    return { offer };
};

export const useCreateOffer = () => {
    const create = async (offerData) => {
        offerData.createdAt = new Date().toISOString();
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