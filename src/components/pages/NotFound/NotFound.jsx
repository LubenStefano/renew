import React from 'react';
import styles from './NotFound.module.css';
import Button from '../../shared/Button/Button';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    return (
        <main className="not-found-page">
            <section className={styles.hero}>
                <div className={styles['hero-content']}>
                    <h1><i>Are you lost !?</i><br />
                        PAGE NOT FOUND</h1>
                        <Button text="GO HOME" onClick={goHome} className={"go-back"}></Button>
                </div>
                <img id="hero-img" className={styles.heroImg} src="/images/hero-img.png" alt="Hero image of flowers" />
            </section>
        </main>
    );
}
