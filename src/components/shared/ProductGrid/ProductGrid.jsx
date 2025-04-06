import React from "react";
import styles from "./ProductGrid.module.css";
import Button from "../Button/Button";
import { Skeleton } from 'antd';

export default function ProductGrid({ offers, onProductClick }) {
    if (!offers ) {
        return (
            <div className={styles["product-grid-carousel"]}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={styles["product"]}>
                        <Skeleton.Image style={{ width: 200, height: 200 }} />
                        <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 2, width: ['80%', '90%'] }} />
                    </div>
                ))}
            </div>
        );
    }
    if (offers.length === 0) {
        return <p>No products available.</p>;
    }

    return (
        <div className={styles["product-grid-carousel"]}>
            {offers.map((offer) => (
                <div key={offer.id} className={styles["product"]}>
                    <img src={offer.img} alt={offer.name} />
                    <h3>{offer.name}</h3>
                    <p>{offer.description}</p>
                    <Button
                        text="SEE PRODUCT"
                        onClick={() => onProductClick(offer.id)}
                        className={"see-product"}
                    />
                </div>
            ))}
        </div>
    );
}
