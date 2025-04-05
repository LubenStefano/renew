import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../../../context/UserContext';
import { useGetOffersByUserId, useSavedOffers } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/Button/Button';
import { useDeleteUser, useUserById } from '../../../hooks/useAuth';

export default function Profile() {

    const navigate = useNavigate();
    const { user } = useUser();
    const { userId } = useParams(); 
    const { userById } = useUserById(userId); 

    useEffect(() => {
        if (user) {
            console.log("User state in Profile:", user); 
        }
    }, [user]);

    const { userOffers } = useGetOffersByUserId(userId);
    const { savedOffers } = useSavedOffers(userId);
    const { deleteUser } = useDeleteUser();

    console.log("Profile user state:", user);

    if (!user || !userById) {
        return <p>Loading user data...</p>;
    }

    if (!savedOffers) {
        return <p>Loading saved offers...</p>;
    }

    const seeProduct = (id) => {
        navigate(`/offers/details/${id}`);
    };

    const editProfile = () => {
        navigate('/profile/edit');
    };

    const deleteProfile = () => {
        if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            deleteUser(user.id)
                .then(() => {
                    console.log("User deleted successfully!");
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        }
    };

    const isCurrentUser = user.id === userId; // Check if the profile belongs to the logged-in user
    console.log(`Is current user: ${user.id} and ${userId}`); // Debug log
    console.log("User profile:", userById); // Debug log to verify user offers

    return (
        <section className={styles["profile-page"]}>
            <div className={styles["profile-header"]}>
                <img src={userById.profilePicture} alt="Profile" className={styles["profile-picture"]} />
                <div className={styles["profile-info"]}>
                    <h2>{userById.name}</h2>
                    <p><strong>contacts:</strong></p>
                    <p>gsm: {userById.phone}</p>
                    <p>email: {userById.email}</p>
                </div>
                {isCurrentUser && ( // Conditionally render edit and delete buttons
                    <div className={styles["profile-actions"]}>
                        <Button text="EDIT PROFILE" className={styles["edit-profile"]} onClick={editProfile} />
                        <Button text="DELETE PROFILE" className={styles["delete-profile"]} onClick={deleteProfile} />
                    </div>
                )}
            </div>

            <div className={styles["profile-content"]}>
                <div className={styles["products-section"]}>
                    <h3>PRODUCTS</h3>
                    <div className={styles["product-grid"]}>
                        <ProductGrid offers={userOffers} onProductClick={seeProduct} />
                    </div>
                </div>
                {isCurrentUser && ( // Conditionally render the "SAVED" section
                    <div className={styles["saved-section"]}>
                        <h3>SAVED</h3>
                        <ProductGrid offers={savedOffers} onProductClick={seeProduct} />
                    </div>
                )}
            </div>
        </section>
    );
}