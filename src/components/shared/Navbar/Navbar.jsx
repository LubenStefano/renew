import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
      <header className={styles.header}>
        <div className={styles.logo}><NavLink to={"/"} >ReNew</NavLink></div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({isActive}) => isActive ? styles.activeStyle : undefined}>HOME</NavLink></li>
            <li><NavLink to="/products" className={({isActive}) => isActive ? styles.activeStyle : undefined} >PRODUCTS</NavLink></li>
            <li><NavLink to="/login" className={({isActive}) => isActive ? styles.activeStyle : undefined} >LOGIN</NavLink></li>
            <li><NavLink to="/register" className={({isActive}) => isActive ? styles.activeStyle : undefined} >REGISTER</NavLink></li>
          </ul>
        </nav>
      </header>
    );
}