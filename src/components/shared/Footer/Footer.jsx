import React from 'react';
import styles from './Footer.module.css';

export default function () {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-logo']}>
          <h2>ReNew</h2>
          <p>Despite the rise<br />the rise<br />fast fashion<br />making</p>
        </div>
        <div className={styles['footer-contacts']}>
          <h3>CONTACTS</h3>
          <p>
            Despite the rise of fast fashion making the dollar $ amounts tick
            upward on your secondhand clothing, it is still much more affordable
            than brand new clothing.
          </p>
        </div>
        <div className={styles['social-links']}>
          <a href="#"><img src="facebook-icon.png" alt="f" /></a>
          <a href="#"><img src="instagram-icon.png" alt="i" /></a>
          <a href="#"><img src="twitter-icon.png" alt="t" /></a>
          <a href="#">^</a>
        </div>
      </div>
      <p className={styles['footer-note']}>
        ReNew is place to buy and sell second-hand products. 2025 ©
      </p>
    </footer>
  );
}