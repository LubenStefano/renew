import React, { useState, useEffect } from 'react';
import styles from './Details.module.css';
import { useOffer, useSaveOffer, useDeleteSavedOffer, useSavedOffers, useDeleteOffer } from '../../../hooks/useOffers';
import { useNavigate, useParams } from 'react-router';
import { useUser } from '../../../context/UserContext';
import Button from '../../shared/Button/Button';
import { Skeleton } from 'antd';
import { useErrorHandler } from '../../../hooks/useErrorHandler';

export default function Details() {

  const { id } = useParams();
  const { offer, creator } = useOffer(id);
  const { user } = useUser(); 
  const { saveOffer } = useSaveOffer();
  const { deleteSavedOffer } = useDeleteSavedOffer();
  const { savedOffers } = useSavedOffers();
  const { remove } = useDeleteOffer();

  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (savedOffers && offer) {
      setIsSaved(savedOffers.some(savedOffer => savedOffer.id === offer.id));
    }

    return () => controller.abort(); 
  }, [savedOffers, offer]);

  if (!offer || !creator) {
    return (
      <div className={styles["product-details"]}>
        <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 1, width: ['30%'] }} />
        <div className={styles["big-container"]}>
          <div className={styles["product-container"]}>
            <Skeleton.Image style={{ width: 300, height: 300 }} />
            <div className={styles["product-info"]}>
              <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 3, width: ['60%', '80%', '50%'] }} />
            </div>
          </div>
          <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 2, width: ['90%', '80%'] }} />
        </div>
      </div>
    );
  }

  const toggleSaveHandler = () => {
    if (isSaved) {
      deleteSavedOffer(offer.id)
        .then(() => {
          setIsSaved(false);
        })
        .catch((error) => {
          console.error("Error unsaving offer:", error);
        });
    } else {
      saveOffer(offer.id)
        .then(() => {
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

  const profileHandler = () => {
    navigate(`/profile/${offer.creator}`);
  };

  const handleNoUserClick = () => {
    const { handleError } = useErrorHandler();
    handleError(null, "You must be logged in to see the profile.");
  }

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      remove(offer.id)
        .then(() => {
          navigate(`/profile/${offer.creator}`);
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
              <p className={styles["price"]}><b>PRICE:</b> <span>{offer.price}$</span></p>
              <p className={styles["location"]}><b>SELLER:</b></p>
              <div
                className={styles["seller-info"]}
                onClick={user ? profileHandler : handleNoUserClick}
              >
                <img src={creator.profilePicture} className={styles["profile-picture"]} />
                <p className={styles["seller"]}><span>{creator.name}</span></p>
              </div>
              <p className={styles["contacts"]}>
                <b>contacts:</b><br />
                gsm: {creator.phone}<br />
                email: {creator.email}
              </p>
              <p className={styles["condition"]}><b>CONDITION:</b> <span>{offer.condition}</span></p>
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
          {user && (
            <div className={styles["actions"]}>
              {user?.id === offer.creator ? (
                <>
                  <Button text="EDIT OFFER" className={styles["edit"]} onClick={handleEditClick} />
                  <Button text="DELETE OFFER" className={styles["delete"]} onClick={handleDeleteClick} />
                </>
              ) : (
                <>
                  <Button text="CALL NOW" className={styles["call"]} onClick={handleCallClick} />
                  <Button text="EMAIL NOW" className={styles["email"]} onClick={handleEmailClick} />
                  <Button
                    onClick={toggleSaveHandler}
                    text={isSaved ? "UNSAVE" : "SAVE NOW"}
                    className={isSaved ? styles["unsave"] : styles["save"]}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}