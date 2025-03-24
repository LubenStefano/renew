import React, { useEffect } from 'react';
import styles from './Products.module.css';
import { useNavigate } from 'react-router';
import Button from '../../shared/Button/Button';
import { useParams, useSearchParams } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category') || category;

    const seeProduct = (id) => {
        navigate(`/details/${id}`);
    };

    useEffect(() => {
        if (categoryQuery) {
            console.log(`Fetching products for category: ${categoryQuery}`);
        }
    }, [categoryQuery]);

    return (
        <section className={styles["products-page"]}>
            <h2>Products</h2>
            {categoryQuery && <h2>Category: <span className={styles["category-span"]}>{categoryQuery}</span></h2>}
            <div className={styles["filter-dropdown"]}>
                <button className={styles["filter-button"]}>CATEGORY ▼</button>
                <div className={styles["filter-options"]}>
                    <a href="#">HOME & GARDEN</a>
                    <a href="#">ELECTRONICS</a>
                    <a href="#">CLOTHES</a>
                    <a href="#">VEHICLES</a>
                </div>
            </div>
            <div className={styles["product-grid"]}>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original sofa"
                    />
                    <h3>The original sofa</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original car"
                    />
                    <h3>The original car</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original sofa"
                    />
                    <h3>The original sofa</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original car"
                    />
                    <h3>The original car</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original sofa"
                    />
                    <h3>The original sofa</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original car"
                    />
                    <h3>The original car</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original sofa"
                    />
                    <h3>The original sofa</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original car"
                    />
                    <h3>The original car</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original sofa"
                    />
                    <h3>The original sofa</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
                <div className={styles["product"]}>
                    <img
                        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                        alt="The original car"
                    />
                    <h3>The original car</h3>
                    <p>
                        ReNew is a place to buy and sell secondhand products. ReNew product
                        now!
                    </p>
                    <Button text="SEE PRODUCT" onClick={() => seeProduct(1)} className={"see-product"}></Button>
                </div>
            </div>
        </section>
    );
}