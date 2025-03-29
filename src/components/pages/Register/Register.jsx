import React, { useState } from 'react';
import styles from './Register.module.css';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        contactEmail: '',
        profilePicture: '',
        email: '',
        password: '',
        rePassword: '',
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
        <section className={styles['register-container']}>
            <div className={styles['register-form']}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-sections']}>
                        <div className={styles['form-section']}>
                            <h3>PERSONAL INFO:</h3>
                            <label htmlFor="name">name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="e.g: Ivan Petrov"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="phone">phone number:</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="e.g: 0885 765 765"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="contactEmail">contact email:</label>
                            <input
                                type="email"
                                id="contactEmail"
                                placeholder="e.g: example@example.eg"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="profilePicture">profile picture:</label>
                            <input
                                type="url"
                                id="profilePicture"
                                placeholder="e.g: https://example.com/image.jpg"
                                value={formData.profilePicture}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles['form-section']}>
                            <h3>LOGIN CREDENTIALS:</h3>
                            <label htmlFor="email">email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="e.g: renew@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="rePassword">re-password:</label>
                            <input
                                type="password"
                                id="rePassword"
                                placeholder="********"
                                value={formData.rePassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">REGISTER</button>
                </form>
                <p>
                    Have an account? <a href="#">Login now</a>
                </p>
            </div>
            <div className={styles['register-image']}>
                <img src="/images/flowers.png" alt="Login background" />
            </div>
        </section>
    );
}