import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>ReNew</div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="#">HOME</a></li>
            <li><a href="#">PRODUCTS</a></li>
            <li><a href="#">LOGIN</a></li>
            <li><a href="#">REGISTER</a></li>
          </ul>
        </nav>
      </header>
    );
}