import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useOffer, useEditOffer } from '../../../hooks/useOffers';
import styles from './EditOffer.module.css';

export default function EditOffer() {
    const { id } = useParams();
    const { offer } = useOffer(id);
    const { edit } = useEditOffer();
    const { user } = useUser(); 
    const navigate = useNavigate();

    if(offer.creator !== user.id){
        navigate('/offers');
        return <p>You are not authorized to edit this offer.</p>;
    }

    const [formData, setFormData] = useState({
        productName: '',
        condition: '',
        description: '',
        productImage: '',
        productCategory: '',
    });

    useEffect(() => {
        if (offer) {
            setFormData({
                productName: offer.name || '',
                condition: offer.condition || '',
                description: offer.description || '',
                productImage: offer.img || '',
                productCategory: offer.category || '',
                price: offer.price || '',
            });
        }
    }, [offer]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedOffer = {
            name: formData.productName,
            condition: formData.condition,
            description: formData.description,
            img: formData.productImage,
            category: formData.productCategory,
            price: formData.price,
        };

        edit(id, updatedOffer)
            .then(() => {
                console.log('Offer updated successfully!');
                navigate(`/offers/details/${id}`);
            })
            .catch((error) => {
                console.error('Error updating offer:', error);
            });
    };

    if (!offer) {
        return <p>Loading offer details...</p>;
    }

    return (
        <section className={styles['edit-offer-container']}>
            <div className={styles['edit-offer-form']}>
                <h1>Edit Offer</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-sections']}>
                        <div className={styles['form-section']}>
                            <label htmlFor="productName">Product Name:</label>
                            <input
                                type="text"
                                id="productName"
                                placeholder="e.g: iPhone 11 Pro, eSIM"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="condition">Condition:</label>
                            <select
                                id="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                            </select>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                placeholder="e.g: I am selling because I have a new phone..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className={styles['form-section']}>
                        <label htmlFor="productImage">Price:</label>
                            <input
                                type="number"
                                id="price"
                                placeholder="e.g: 800"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="price">Price:</label>
                            <input
                                type="url"
                                id="productImage"
                                placeholder="e.g: URL"
                                value={formData.productImage}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="productCategory">Product Category:</label>
                            <select
                                id="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">SAVE CHANGES</button>
                </form>
            </div>
        </section>
    );
}