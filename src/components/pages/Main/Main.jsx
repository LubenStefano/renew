import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Button from '../../shared/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#fff6df';
        return () => {
            document.body.style.backgroundColor = '#ffffff';
        };
    }, []);

    const seeCollection = () => {
        navigate('/products');
    };

    const seeProduct = (id) => {
        navigate(`/details/${id}`);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const products = [
        { id: 1, title: "The original sofa", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 2, title: "The original car", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 3, title: "The original sofa", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 4, title: "The original sofa", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 5, title: "The original sofa", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 6, title: "The original car", img: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 7, title: "The original sofa", img: "https://cdn.shopify.com/s/files/1/0310/7487/7577/products/00722-Cars-_Blackstone__Rounded_13457a25-19b0-4840-9fa0-bb5cddd25a3c.webp?v=1673448458", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
        { id: 8, title: "The original car", img: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/25DAB0174DD0628DA9F43E863EE46348131275F683AF7A8F74AA7BEDAE39E777/scale?width=440&aspectRatio=1.78&format=webp", description: "ReNew is a place to buy and sell secondhand products. ReNew product now!" },
    ];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 4) % products.length);
            setIsAnimating(false);
        }, 300); 
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 4 + products.length) % products.length);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <main>
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
                <Link to="/products?category=Home&Garden">HOME & GARDEN</Link>
                <Link to="/products?category=Clothes">CLOTHES</Link>
                <Link to="/products?category=Vehicles">VEHICLES</Link>
                <Link to="/products?category=Electronics">ELECTRONICS</Link>
            </nav>

            <section className={styles['latest-products']}>
                <h2>Our latest products</h2>
                <div
                    className={`${styles['product-carousel']} ${isAnimating ? styles['animating'] : ''}`}
                >
                    {products.slice(currentIndex, currentIndex + 4).map((product) => (
                        <div key={product.id} className={styles.product}>
                            <img src={product.img} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <Button text="SEE PRODUCT" onClick={() => seeProduct(product.id)} className={"show-more"} />
                        </div>
                    ))}
                </div>
                <div className={styles['carosel-controls']}>
                    <span id="prev" onClick={handlePrev}>{'<'}</span>
                    <span id="next" onClick={handleNext}>{'>'}</span>
                </div>
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