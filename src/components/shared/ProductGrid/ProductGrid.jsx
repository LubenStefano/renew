import React from "react";
import styles from "./ProductGrid.module.css";
import Button from "../Button/Button";

export default function ProductGrid({ offers, onProductClick }) {
    if (!offers || offers.length === 0) {
        return <div className={styles["product-grid-carousel"]}>No products available.</div>;
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
