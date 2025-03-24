import React from 'react';
import styles from './Details.module.css';

export default function Details() {
  return (
    <main>
      <section className={styles["product-details"]}>
        <h1 className={styles["offer-title"]}>The original sofa:</h1>
        <div className={styles["big-container"]}>
          <div className={styles["product-container"]}>
            <div className={styles["product-image"]}>
              <img
                src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                alt="Sofa"
              />
            </div>
            <div className={styles["product-info"]}>
              <p className={styles["price"]}>PRICE: <span>250$</span></p>
              <p className={styles["seller"]}>SELLER: <span>Luben- Stefano</span></p>
              <p className={styles["contacts"]}>
                contacts:<br />
                gsm: 358 893 483<br />
                email: lsf@abv.bg
              </p>
              <p className={styles["condition"]}>CONDITION: <span>Like new</span></p>
            </div>
          </div>
          <div className={styles["description"]}>
            <h2>DESCRIPTION:</h2>
            <p>
              ReNew is place to buy and sell second-hand products. ReNew product
              now! ReNew is place to buy and sell second-hand products. ReNew
              product now!
            </p>
          </div>
          <div className={styles["category"]}>
            <h2>CATEGORY:</h2>
            <p>HOME & GARDEN</p>
          </div>
          <div className={styles["actions"]}>
            <button className={styles["call"]}>CALL NOW</button>
            <button className={styles["text"]}>TEXT NOW</button>
            <button className={styles["email"]}>EMAIL</button>
            <button className={styles["save"]}>SAVE OFFER</button>
          </div>
        </div>
      </section>
    </main>
  );
}