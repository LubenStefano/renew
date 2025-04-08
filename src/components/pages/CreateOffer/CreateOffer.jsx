import React from 'react';
import styles from './CreateOffer.module.css';
import { useNavigate } from 'react-router';
import { useCreateOffer } from '../../../hooks/useOffers';
import { useErrorHandler } from '../../../hooks/useErrorHandler';

export default function CreateOffer() {
    const navigate = useNavigate();
    const { create } = useCreateOffer(); 
    const { handleError } = useErrorHandler();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const offerData = Object.fromEntries(formData);

        if (offerData.price <= 0) {
            handleError(null, "Price must be greater than 0.");
            return;
        }

        try {
            await create(offerData);
            navigate("/offers");
        } catch (error) {
            handleError(error, 'Failed to create offer.');
        }
    };

    return (
        <section className={styles['create-offer-container']}>
            <div className={styles['create-offer-form']}>
                <h1>Create Offer</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-sections']}>
                        <div className={styles['form-section']}>
                            <label htmlFor="name">product name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="e.g: Iphone 11 pro, eSIM"
                                required
                            />
                            <label htmlFor="condition">condition:</label>
                            <select
                                id="condition"
                                name="condition"
                                required
                            >
                                <option value="" disabled>
                                    select
                                </option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                            </select>
                            <label htmlFor="description">description:</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="e.g: I am selling, because I have new phone..."
                                required
                            ></textarea>
                        </div>
                        <div className={styles['form-section']}>
                            <label htmlFor="img">product image:</label>
                            <input
                                type="url"
                                id="img"
                                name="img"
                                placeholder="e.g: URL"
                                required
                            />
                            <label htmlFor="category">product category:</label>
                            <select
                                id="category"
                                name="category"
                                required
                            >
                                <option value="" disabled>
                                    select
                                </option>
                                <option value="home">Home</option>
                                <option value="clothes">Clothes</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="electronics">Electronics</option>
                            </select>
                            <label htmlFor="price">price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="e.g: 500"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">CREATE POST</button>
                </form>
            </div>
        </section>
    );
}
