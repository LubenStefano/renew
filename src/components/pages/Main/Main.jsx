import React, { useState } from 'react';
import styles from './Main.module.css';
import Button from '../../shared/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLatestOffers } from '../../../hooks/useOffers';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';

export default function Main() {
    const navigate = useNavigate();

    const seeCollection = () => {
        navigate('/products');
    };

    const seeProduct = (id) => {
        navigate(`offers/details/${id}`);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { latestOffers: products } = useLatestOffers();

    const handleNext = () => {
        if (isAnimating || products.length <= 4) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 4) % products.length);
            setIsAnimating(false);
        }, 300);
    };

    const handlePrev = () => {
        if (isAnimating || products.length <= 4) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 4 + products.length) % products.length);
            setIsAnimating(false);
        }, 300);
    };

    const visibleProducts = [];
    for (let i = 0; i < 4; i++) {
        const productIndex = (currentIndex + i) % products.length;
        if (!visibleProducts.includes(products[productIndex])) {
            visibleProducts.push(products[productIndex]);
        }
    }
    console.log(visibleProducts);

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

            {products.length > 0 && (
                <section className={styles['latest-products']}>
                    <h2>Our latest products</h2>
                    <div className={styles['product-carousel']}>
                        <ProductGrid
                            offers={visibleProducts}
                            onProductClick={seeProduct}
                        />
                    </div>
                    <div className={styles['carosel-controls']}>
                        <span id="prev" onClick={handlePrev}>{'<'}</span>
                        <span id="next" onClick={handleNext}>{'>'}</span>
                    </div>
                </section>
            )}

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