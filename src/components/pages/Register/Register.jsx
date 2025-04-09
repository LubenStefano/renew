import React, { useState } from "react";
import { useRegister } from "../../../hooks/useAuth";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../../context/UserContext";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        profilePicture: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const [passwordError, setPasswordError] = useState(null);
    const { register } = useRegister();
    const { handleError } = useErrorHandler();

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
        if (formData.password !== formData.rePassword) {
            setPasswordError("Passwords do not match.");
            handleError(null, "Passwords do not match.");
            return;
        }
        setPasswordError(null);
        try {
            const { email, password, rePassword, ...additionalData } = formData;
            await register(email, password, additionalData);
        } catch (err) {
            handleError(err, "Registration failed.");
        }
    };

    return (
        <section className={styles["register-container"]}>
            <div className={styles["register-form"]}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["form-sections"]}>
                        <div className={styles["form-section"]}>
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
                            <label htmlFor="profilePicture">profile picture:</label>
                            <input
                                type="url"
                                id="profilePicture"
                                placeholder="e.g: https://example.com/image.jpg"
                                value={formData.profilePicture}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["form-section"]}>
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
                            <label htmlFor="rePassword">re-enter password:</label>
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
                {passwordError && <p className={styles["error"]}>{passwordError}</p>}
                <p>
                    Have an account? <Link to="/login">Login now</Link>
                </p>
            </div>
            <div className={styles["register-image"]}>
                <img src="/images/flowers.png" alt="Login background" />
            </div>
        </section>
    );
}