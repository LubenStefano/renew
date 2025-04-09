import React from 'react';
import styles from './SavedOffers.module.css';
import { useSavedOffers } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import { useNavigate, useParams } from 'react-router-dom';

export default function SavedOffers() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { savedOffers } = useSavedOffers(userId); // Ensure `useSavedOffers` uses AbortController internally

    const seeProduct = (id) => {
        navigate(`/offers/details/${id}`);
    };

    return (
        <section className={styles["saved-page"]}>
            <div className={styles["saved-section"]}>
                <h1>SAVED OFFERS</h1>
                <ProductGrid offers={savedOffers} onProductClick={seeProduct} />
            </div>
        </section>
    );
}