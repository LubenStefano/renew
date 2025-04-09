import React, { useRef, useEffect, useState } from 'react';
import styles from './InfiniteCarousel.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { request } from '../../../utils/request'; // Import request utility

export default function InfiniteCarousel({ autoSlide = true, interval = 10000, itemsToShow = 1 }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(itemsToShow); // Start at the first cloned set
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Fetch 12 offers once at mount
        const fetchProducts = async () => {
            try {
                console.log('Fetching products...');
                const fetchedProducts = await request.getLatest('offers', 12);
                console.log('Fetched products:', fetchedProducts);
                setProducts([
                    ...fetchedProducts.slice(-itemsToShow), // Clone last set
                    ...fetchedProducts,
                    ...fetchedProducts.slice(0, itemsToShow), // Clone first set
                ]);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [itemsToShow]);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + itemsToShow);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - itemsToShow);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !carousel.firstChild) return; // Ensure carousel and its children exist
        const itemWidth = carousel.firstChild.offsetWidth + 25; // Include gap in width calculation

        const handleTransitionEnd = () => {
            setIsTransitioning(false);
            if (currentIndex >= products.length - itemsToShow) {
                setCurrentIndex(itemsToShow); // Reset to the first real set
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${itemWidth * itemsToShow}px)`;
            } else if (currentIndex < itemsToShow) {
                setCurrentIndex(products.length - itemsToShow * 2); // Reset to the last real set
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${itemWidth * (products.length - itemsToShow * 2)}px)`;
            }
        };

        carousel.addEventListener('transitionend', handleTransitionEnd);
        return () => carousel.removeEventListener('transitionend', handleTransitionEnd);
    }, [currentIndex, products.length, itemsToShow]);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(handleNext, interval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, interval]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !carousel.firstChild) return; // Ensure carousel and its children exist
        const itemWidth = carousel.firstChild.offsetWidth + 25; // Include gap in width calculation
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
    }, [currentIndex, itemsToShow]);

    if (!products || products.length === 0) {
        return (
            <div className={styles.noProductsContainer}>
                <p className={styles.noProductsMessage}>No products available at the moment. Please check back later!</p>
            </div>
        );
    }

    const renderItem = (product) => (
        <div key={product.id} className={styles.carouselItem}>
            <img src={product.img} alt={product.name} className={styles.carouselImage} />
            <p>{product.name}</p>
            <p className='price'>{product.price} $</p>
            <Button text="View Details" onClick={() => navigate(`offers/details/${product.id}`)} />
        </div>
    );

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel} ref={carouselRef}>
                {products.map((item, index) => (
                    <div key={index} className={styles.carouselItem} style={{ flex: `0 0 ${100 / itemsToShow}%` }}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
            <button className={styles.prevButton} onClick={handlePrev}>
                {'<'}
            </button>
            <button className={styles.nextButton} onClick={handleNext}>
                {'>'}
            </button>
        </div>
    );
}
