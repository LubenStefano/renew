import React, { useState } from 'react';
import styles from './EditProfile.module.css';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: 'Ivan Petrov',
        phone: '0885 765 765',
        profilePicture: 'https://jhbaghjkug/asughtofj/36',
        contactEmail: 'example@example.eg',
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
        <section className={styles['edit-profile-container']}>
            <div className={styles['edit-profile-form']}>
                <h1>Edit Profile</h1>
                <h3>PERSONAL INFO:</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="name">name:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="phone">phone number:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="profilePicture">profile picture:</label>
                        <input
                            type="url"
                            id="profilePicture"
                            value={formData.profilePicture}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="contactEmail">contact email:</label>
                        <input
                            type="email"
                            id="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">EDIT PROFILE</button>
                </form>
            </div>
        </section>
    );
}