import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext'; // Use updateUser from UserContext
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';

export default function EditProfile() {
    const { user, setUser } = useUser(); // Access setUser from UserContext
    const navigate = useNavigate();
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
        try {
            await setUser(formData); // Update user in context and Firebase
            console.log("Profile updated successfully!"); // Debug log
            navigate(`/profile/${user.id}`); // Navigate back to the profile page
        } catch (err) {
            console.error('Error updating profile:', err);
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