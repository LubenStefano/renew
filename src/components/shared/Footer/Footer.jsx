import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useUser } from '../../../context/UserContext';

export default function () {
  const { user } = useUser();

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-logo']}>
          <h2>ReNew</h2>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/offers">Products</Link></li>
              {!user && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
              {user && (
                <>
                  <li><Link to={`/profile/${user.id}`}>Profile</Link></li>
                  <li><Link to={`/savedOffers/${user.id}`}>Saved Offers</Link></li>
                </>
              )}
            </ul>
          </div>
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