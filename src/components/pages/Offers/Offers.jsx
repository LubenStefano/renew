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

    const { offers, fetchOffers } = useOffers(); // Ensure `useOffers` exposes a `fetchOffers` method
    const [filteredOffers, setFilteredOffers] = useState([]);

    useEffect(() => {
        if (categoryQuery) {
            console.log(`Fetching products for category: ${categoryQuery}`);
        }
    }, [categoryQuery]);

    useEffect(() => {
        if (categoryQuery) {
            const filtered = offers.filter(
                (offer) => offer.category.toLowerCase() === categoryQuery.toLowerCase()
            );
            setFilteredOffers(filtered);
        } else {
            setFilteredOffers(offers);
        }
    }, [categoryQuery, offers]);

    // Polling mechanism to fetch offers periodically
    useEffect(() => {
        const interval = setInterval(() => {
            fetchOffers(); // Fetch the latest offers
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [fetchOffers]);

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