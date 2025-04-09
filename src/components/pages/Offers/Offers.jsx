import React, { useEffect, useState } from 'react';
import styles from './Offers.module.css';
import { useNavigate } from 'react-router';
import { useParams, useSearchParams } from 'react-router-dom';
import { useOffers } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';

export default function Products() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category') || category;

    const seeProduct = (id) => {
        navigate(`/offers/details/${id}`);
    };

    const { offers , fetchOffers } = useOffers(); // Ensure `useOffers` exposes a `fetchOffers` method
    const [filteredOffers, setFilteredOffers] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (categoryQuery) {
            fetchOffers(signal).catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch offers:', error);
                }
            });
        }

        return () => controller.abort(); // Cleanup function
    }, [categoryQuery]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (categoryQuery && offers) {
            const filtered = offers.filter(
                (offer) => offer.category.toLowerCase() === categoryQuery.toLowerCase()
            );
            setFilteredOffers(filtered);
        } else {
            setFilteredOffers(offers);
        }

        return () => controller.abort(); // Cleanup function
    }, [categoryQuery, offers]);

    return (
        <section className={styles["products-page"]}>
            <h2>Products</h2>
            {categoryQuery && (
                <h2>
                    Category:{" "}
                    <span className={styles["category-span"]}>
                        {categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1)}
                    </span>
                    <span className={styles["remove-filter"]} onClick={() => navigate('/offers')} >remove filter</span>
                </h2>
            )}
            <div className={styles["filter-dropdown"]}>
                <button className={styles["filter-button"]}>CATEGORY ▼</button>
                <div className={styles["filter-options"]}>
                    <a href="#" onClick={() => navigate('/offers?category=home')}>HOME</a>
                    <a href="#" onClick={() => navigate('/offers?category=electronics')}>ELECTRONICS</a>
                    <a href="#" onClick={() => navigate('/offers?category=clothes')}>CLOTHES</a>
                    <a href="#" onClick={() => navigate('/offers?category=vehicles')}>VEHICLES</a>
                </div>
            </div>
            <ProductGrid offers={filteredOffers} onProductClick={seeProduct} />
        </section>
    );
}