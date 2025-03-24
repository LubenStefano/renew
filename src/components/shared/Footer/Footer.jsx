import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function () {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-logo']}>
          <h2>ReNew</h2>
          <p>
            ReNew is your trusted platform for buying and selling secondhand products. 
            We believe in sustainability and giving products a second life, reducing waste, 
            and promoting a greener future.
          </p>
        </div>
        <div className={styles['footer-contacts']}>
          <h3>CONTACTS</h3>
          <p>
            Have questions or need assistance? <i>Reach out to us at</i>:
            <br />
            Email: <a href="mailto:support@renew.com" style={{ color: "black" }}>support@renew.com</a>
            <br />
            Phone: +359 887 4567
            <br />
            Address: 123 Bulgarian Bul Lane, Sofia;
          </p>
        </div>
        <div className={styles['social-links']}>
          <Link to="https://www.facebook.com/luben.stefano/?locale=bg_BG"><FaFacebookF color='#e6aa65' size={"30px"}/></Link>
          <Link to="https://www.instagram.com/lubenstefano/"><FaInstagram color='#e6aa65' size={"30px"}/></Link>
          <Link to="https://x.com/"><FaTwitter color='#e6aa65' size={"30px"} /></Link>
        </div>
      </div>
      <p className={styles['footer-note']}>
        Made by Luben-Stefano for Softuni React Course. 2025 ©
      </p>
    </footer>
  );
}