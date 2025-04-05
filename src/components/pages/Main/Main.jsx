import React from 'react';
import styles from './Main.module.css';
import Button from '../../shared/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InfiniteCarousel from '../../shared/InfiniteCarousel/InfiniteCarousel';

export default function Main() {
    const navigate = useNavigate();

    const seeCollection = () => {
        navigate('/offers');
    };

    return (
        <main className="main-page">
            <section className={styles.hero}>
                <div className={styles['hero-content']}>
                    <h1>Why ReNew?</h1>
                    <p>
                        ReNew is the place to buy and sell secondhand products.<br />Renew a
                        product now!
                    </p>
                    <Button text="SEE COLLECTION" onClick={seeCollection} className={"see-collection"}></Button>
                </div>
                <img id="hero-img" src="/images/hero-img.png" alt="The original sofa" />
            </section>

            <nav className={styles.categories}>
                <Link to="/offers?category=home">HOME</Link>
                <Link to="/offers?category=clothes">CLOTHES</Link>
                <Link to="/offers?category=vehicles">VEHICLES</Link>
                <Link to="/offers?category=electronics">ELECTRONICS</Link>
            </nav>

            <section className={styles['latest-products']}>
                <h2>Our latest products</h2>
                <InfiniteCarousel autoSlide={true} interval={15000} itemsToShow={4} />
            </section>

            <section className={styles.about}>
                <h2>About</h2>
                <div className={styles['about-content']}>
                    <div>
                        <h3>OUR TEAM</h3>
                        <p>
                            Our team is dedicated to promoting sustainability by encouraging the reuse of quality products. 
                            We are a group of passionate individuals who believe in reducing waste and making secondhand 
                            shopping a seamless and enjoyable experience for everyone.
                        </p>
                    </div>
                    <div>
                        <h3>OUR GOALS</h3>
                        <p>
                            Our goal is to create a community-driven platform where people can buy and sell secondhand 
                            items with ease. We aim to reduce environmental impact by extending the lifecycle of products 
                            and fostering a culture of conscious consumption.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}