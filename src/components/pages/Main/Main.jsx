import React from 'react';
import styles from './Main.module.css';
import Button from '../../shared/Button/Button';

export default function Main() {

    const seeCollection = () => {
        console.log("see collection");
    }

    const showMore = () => {
        console.log("show more");
    }
        

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
        <a href="#">HOME & GARDEN</a>
        <a href="#">CLOTHES</a>
        <a href="#">VEHICLES</a>
        <a href="#">ELECTRONICS</a>
      </nav>

      <section className={styles['latest-products']}>
        <h2>Our latest products</h2>
        <div className={styles['product-carousel']}>
          <div className={styles.product}>
            <img
              src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              alt="The original sofa"
            />
            <h3>The original sofa</h3>
            <p>
              ReNew is a place to buy and sell secondhand products. ReNew product
              now!
            </p>
            <Button text="SHOW MORE" onClick={showMore} className={"show-more"}></Button>
          </div>
          <div className={styles.product}>
            <img
              src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              alt="The original car"
            />
            <h3>The original car</h3>
            <p>
              ReNew is a place to buy and sell secondhand products. ReNew product
              now!
            </p>
            <Button text="SHOW MORE" onClick={showMore} className={"show-more"}></Button>
          </div>
          <div className={styles.product}>
            <img
              src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              alt="The original sofa"
            />
            <h3>The original sofa</h3>
            <p>
              ReNew is a place to buy and sell secondhand products. ReNew product
              now!
            </p>
            <Button text="SHOW MORE" onClick={showMore} className={"show-more"}></Button>
          </div>
          <div className={styles.product}>
            <img
              src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              alt="The original sofa"
            />
            <h3>The original sofa</h3>
            <p>
              ReNew is a place to buy and sell secondhand products. ReNew product
              now!
            </p>
            <Button text="SHOW MORE" onClick={showMore} className={"show-more"}></Button>
          </div>
        </div>
        <div className={styles['carosel-controls']}>
          <span id="prev">{'<'}</span>
          <span id="next">{'>'}</span>
        </div>
      </section>

      <section className={styles.about}>
        <h2>About</h2>
        <div className={styles['about-content']}>
          <div>
            <h3>OUR TEAM</h3>
            <p>
              Despite the rise of fast fashion making the dollar $ amounts tick
              upward on your secondhand clothing...
            </p>
          </div>
          <div>
            <h3>OUR GOALS</h3>
            <p>
              Despite the rise of fast fashion making the dollar $ amounts tick
              upward on your secondhand clothing...
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}