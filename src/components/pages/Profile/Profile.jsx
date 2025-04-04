import React from 'react';
import styles from './Profile.module.css';
import { useUser } from '../../../context/UserContext';
import { useGetOffersByUser, useSavedOffers } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import { useNavigate } from 'react-router';
import Button from '../../shared/Button/Button';
import { useDeleteUser } from '../../../hooks/useAuth';

export default function Profile() {

    const navigate = useNavigate();

    const { user } = useUser();

    const { userOffers } = useGetOffersByUser(user?.id);
    const { savedOffers } = useSavedOffers(user?.id);
    const {deleteUser} = useDeleteUser(user?.id);

    if (!user) {
        return <p>Loading user data...</p>; 
    }
    
    if (!savedOffers) {
        return <p>Loading saved offers...</p>;
    }

    const seeProduct = (id) => {
        navigate(`/offers/details/${id}`);
    }

    const editProfile = () => {
        navigate('/profile/edit');
    }

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
    }
    

    return (
        <section className={styles["profile-page"]}>
            <div className={styles["profile-header"]}>
                <img src={user.profilePicture} alt="Profile" className={styles["profile-picture"]} />
                <div className={styles["profile-info"]}>
                    <h2>{user.name}</h2>
                    <p><strong>contacts:</strong></p>
                    <p>gsm: {user.phone}</p>
                    <p>email: {user.email}</p>
                </div>
                <div className={styles["profile-actions"]}>
                    <Button text="EDIT PROFILE" className={styles["edit-profile"]} onClick={editProfile}/>
                    <Button text="DELETE PROFILE" className={styles["delete-profile"]} onClick={deleteProfile} />
                </div>
            </div>

            <div className={styles["profile-content"]}>
                <div className={styles["products-section"]}>
                    <h3>PRODUCTS</h3>
                    <div className={styles["product-grid"]}>
                    <ProductGrid offers={userOffers} onProductClick={seeProduct} />
                    </div>
                </div>
                <div className={styles["saved-section"]}>
                    <h3>SAVED</h3>
                     <ProductGrid offers={savedOffers} onProductClick={seeProduct} />
                </div>
            </div>
        </section>
    );
}