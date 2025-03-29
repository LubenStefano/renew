import React, { useState } from 'react';
import styles from './CreateOffer.module.css';

export default function CreateOffer() {
    const [formData, setFormData] = useState({
        productName: '',
        condition: '',
        description: '',
        productImage: '',
        productCategory: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add further processing logic here
    };

    return (
        <section className={styles['create-offer-container']}>
            <div className={styles['create-offer-form']}>
                <h1>Create Offer</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-sections']}>
                        <div className={styles['form-section']}>
                            <label htmlFor="productName">product name:</label>
                            <input
                                type="text"
                                id="productName"
                                placeholder="e.g: Iphone 11 pro, eSIM"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="condition">condition:</label>
                            <select
                                id="condition"
                                value={formData.condition}
                                onChange={handleChange}
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
                                placeholder="e.g: I am selling, because I have new phone..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className={styles['form-section']}>
                            <label htmlFor="productImage">product image:</label>
                            <input
                                type="url"
                                id="productImage"
                                placeholder="e.g: URL"
                                value={formData.productImage}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="productCategory">product category:</label>
                            <select
                                id="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    select
                                </option>
                                <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">CREATE POST</button>
                </form>
            </div>
        </section>
    );
}
