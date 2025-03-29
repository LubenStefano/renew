import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        <section className={styles['login-container']}>
            <div className={styles['login-form']}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">LOGIN</button>
                </form>
                <p>
                    Don't have an account? <a href="#">Register now</a>
                </p>
            </div>
            <div className={styles['login-image']}>
                <img src="/images/flowers.png" alt="Login background" />
            </div>
        </section>
    );
}