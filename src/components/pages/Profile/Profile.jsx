import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../../../context/UserContext';
import { useGetOffersByUserId } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteUser, useUserById } from '../../../hooks/useAuth';
import ProfileHeader from '../../shared/ProfileHeader/ProfileHeader';

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


    console.log("Profile user state:", user);

    const seeProduct = (id) => {
        navigate(`/offers/details/${id}`);
    };


    const isCurrentUser = user.id === userId; // Check if the profile belongs to the logged-in user

    return (
        <section className={styles["profile-page"]}>
            <ProfileHeader userById={userById} isCurrentUser={isCurrentUser} />

            <div className={styles["profile-content"]}>
                <div className={styles["products-section"]}>
                    <h3>PRODUCTS</h3>
                    <div className={styles["product-grid"]}>
                        <ProductGrid offers={userOffers} onProductClick={seeProduct} />
                    </div>
                </div>
            </div>
        </section>
    );
}