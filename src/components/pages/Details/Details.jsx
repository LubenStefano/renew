import React from 'react';
import styles from './Details.module.css';
import { useOffer } from '../../../hooks/useOffers';
import { useParams } from 'react-router';

export default function Details() {

  const { id } = useParams();
  const { offer } = useOffer(id);
  console.log(offer);

  if (!offer) {
    return <p>Loading offer details...</p>; // Render a loading state if offer is null
  }

  return (
    <main>
      <section className={styles["product-details"]}>
        <h1 className={styles["offer-title"]}>{offer.name}:</h1>
        <div className={styles["big-container"]}>
          <div className={styles["product-container"]}>
            <div className={styles["product-image"]}>
              <img
                src={offer.img}
                alt={offer.name}
              />
            </div>
            <div className={styles["product-info"]}>
              <p className={styles["price"]}>PRICE: <span>{offer.price}$</span></p>
              <p className={styles["seller"]}>SELLER: <span>Luben- Stefano</span></p>
              <p className={styles["contacts"]}>
                contacts:<br />
                gsm: 358 893 483<br />
                email: lsf@abv.bg
              </p>
              <p className={styles["condition"]}>CONDITION: <span>{offer.condition}</span></p>
            </div>
          </div>
          <div className={styles["description"]}>
            <h2>DESCRIPTION:</h2>
            <p>
              {offer.description}
            </p>
          </div>
          <div className={styles["category"]}>
            <h2>CATEGORY:</h2>
            <p>{offer.category}</p>
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