import React, { useEffect, useState } from "react";
import ProductGrid from "./shared/ProductGrid/ProductGrid";
import { request } from "../utils/request";

export default function ParentComponent() {
    const [offers, setOffers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await request.getAll("offers");
                setOffers(data);
            } catch (error) {
                console.error("Failed to fetch offers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    return <ProductGrid offers={offers} loading={loading} onProductClick={(id) => console.log(id)} />;
}
