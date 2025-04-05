import React, { useState, useEffect } from 'react';
import styles from './Details.module.css';
import { useOffer, useSaveOffer, useDeleteSavedOffer, useSavedOffers, useEditOffer, useDeleteOffer } from '../../../hooks/useOffers';
import { useNavigate, useParams } from 'react-router';
import { useUser } from '../../../context/UserContext';
import Button from '../../shared/Button/Button';

export default function Details() {

  const { id } = useParams();
  const { offer, creator } = useOffer(id); // Use the updated hook
  const { user } = useUser(); 
  const { saveOffer } = useSaveOffer();
  const { deleteSavedOffer } = useDeleteSavedOffer();
  const { savedOffers } = useSavedOffers();
  const { remove } = useDeleteOffer();

  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      console.log("User state in Details:", user); // Debug log
    }
  }, [user]);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedOffers && offer) {
      setIsSaved(savedOffers.some(savedOffer => savedOffer.id === offer.id));
    }
  }, [savedOffers, offer]);

  console.log(offer);

  if (!offer || !creator) {
    return <p>Loading offer details...</p>;
  }

  const toggleSaveHandler = () => {
    if (isSaved) {
      deleteSavedOffer(offer.id)
        .then(() => {
          console.log("Offer unsaved successfully!");
          setIsSaved(false);
        })
        .catch((error) => {
          console.error("Error unsaving offer:", error);
        });
    } else {
      saveOffer(offer.id)
        .then(() => {
          console.log("Offer saved successfully!");
          setIsSaved(true);
        })
        .catch((error) => {
          console.error("Error saving offer:", error);
        });
    }
  };

  const handleEmailClick = () => {
    if (creator?.email) {
      window.location.href = `mailto:${creator.email}`;
    }
  };

  const handleCallClick = () => {
    if (creator?.phone) {
      window.location.href = `tel:${creator.phone}`;
    }
  };

  const handleEditClick = () => {
    navigate(`/offers/edit/${offer.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      remove(offer.id)
        .then(() => {
          console.log("Offer deleted successfully!");
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error deleting offer:", error);
        });
    }
  };

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
              <p className={styles["seller"]}>SELLER: <span>{creator.name}</span></p>
              <p className={styles["contacts"]}>
                contacts:<br />
                gsm: {creator.phone}<br />
                email: {creator.email}
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
            {user?.id === offer.creator ? (
              <>
                <Button text="EDIT OFFER" className={styles["edit"]} onClick={handleEditClick} />
                <Button text="DELETE OFFER" className={styles["delete"]} onClick={handleDeleteClick} />
              </>
            ) : (
              <>
                <Button text="CALL NOW" className={styles["call"]} onClick={handleCallClick} />
                <Button text="TEXT NOW" className={styles["text"]} />
                <Button text="EMAIL" className={styles["email"]} onClick={handleEmailClick} />
                <Button
                  onClick={toggleSaveHandler}
                  text={isSaved ? "UNSAVE" : "SAVE NOW"}
                  className={isSaved ? styles["unsave"] : styles["save"]}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}