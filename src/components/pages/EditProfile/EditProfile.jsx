import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import styles from './EditProfile.module.css';
import { showMessage } from '../../../utils/messageHandler';

export default function EditProfile() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        profilePicture: '',
        contactEmail: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                profilePicture: user.profilePicture || '',
                contactEmail: user.email || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            handleError(null, "Name cannot be empty or just spaces.");
            return;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            handleError(null, "Phone number must be exactly 10 digits.");
            return;
        }
        try {
            await setUser(formData);
            showMessage("success", "Profile updated successfully!", "Your profile has been updated successfully.");
            navigate(`/profile/${user.id}`);
        } catch (err) {
            handleError(err, "Failed to update profile.");
        }
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
                    <button type="submit">EDIT PROFILE</button>
                </form>
            </div>
        </section>
    );
}