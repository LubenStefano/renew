import React from 'react';
import styles from './Register.module.css';

export default function Register() {
return (
    <section className={styles['register-container']}>
        <div className={styles['register-form']}>
            <h1>Register</h1>
            <form>
                <div className={styles['form-sections']}>
                    <div className={styles['form-section']}>
                        <h3>PERSONAL INFO:</h3>
                        <label htmlFor="name">name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="e.g: Ivan Petrov"
                            required
                        />
                        <label htmlFor="phone">phone number:</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="e.g: 0885 765 765"
                            required
                        />
                        <label htmlFor="contact-email">contact email:</label>
                        <input
                            type="email"
                            id="contact-email"
                            placeholder="e.g: example@example.eg"
                            required
                        />
                        <label htmlFor="profile-picture">profile picture:</label>
                        <input
                            type="url"
                            id="profile-picture"
                            placeholder="e.g: https://example.com/image.jpg"
                        />
                    </div>
                    <div className={styles['form-section']}>
                        <h3>LOGIN CREDENTIALS:</h3>
                        <label htmlFor="email">email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="e.g: renew@example.com"
                            required
                        />
                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            required
                        />
                        <label htmlFor="re-password">re-password:</label>
                        <input
                            type="password"
                            id="re-password"
                            placeholder="********"
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