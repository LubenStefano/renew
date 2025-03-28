import React from 'react';
import styles from './Profile.module.css';

export default function Profile() {
return (
    <section className={styles["profile-page"]}>
        <div className={styles["profile-header"]}>
            <div className={styles["profile-picture"]}></div>
            <div className={styles["profile-info"]}>
                <h2>Luben- Stefano</h2>
                <p><strong>contacts:</strong></p>
                <p>gsm: 358 893 483</p>
                <p>email: lsf@abv.bg</p>
            </div>
            <div className={styles["profile-actions"]}>
                <button className={styles["edit-profile"]}>EDIT PROFILE</button>
                <button className={styles["delete-profile"]}>DELETE PROFILE</button>
            </div>
        </div>

        <div className={styles["profile-content"]}>
            <div className={styles["products-section"]}>
                <h3>PRODUCTS</h3>
                <div className={styles["product-grid"]}>
                    {/* Example product */}
                    <div className={styles["product"]}>
                        <img src="product-image.jpg" alt="Product" />
                        <h3>The original car</h3>
                        <p>
                            ReNew is a place to buy and sell secondhand products. ReNew
                            product now!
                        </p>
                        <button>SEE PRODUCT</button>
                    </div>
                    {/* Repeat as needed */}
                </div>
            </div>
            <div className={styles["saved-section"]}>
                <h3>SAVED</h3>
                <div className={styles["product-grid"]}>
                    {/* Example saved product */}
                    <div className={styles["product"]}>
                        <img src="product-image.jpg" alt="Product" />
                        <h3>The original sofa</h3>
                        <p>
                            ReNew is a place to buy and sell secondhand products. ReNew
                            product now!
                        </p>
                        <button>SEE PRODUCT</button>
                    </div>
                    {/* Repeat as needed */}
                </div>
            </div>
        </div>
    </section>
);
}