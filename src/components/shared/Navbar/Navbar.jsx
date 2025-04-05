import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useLogout } from '../../../hooks/useAuth';

export default function Navbar() {
    const { user } = useUser(); // Ensure Navbar re-renders when user changes
    const { logout } = useLogout();

    console.log("Navbar user state:", user); // Debug log

    return (
      <header className={styles.header}>
        <div className={styles.logo}><NavLink to={"/"}>ReNew</NavLink></div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({isActive}) => isActive ? styles.activeStyle : undefined}>HOME</NavLink></li>
            <li><NavLink to="/offers" className={({isActive}) => isActive ? styles.activeStyle : undefined}>PRODUCTS</NavLink></li>
            {user ? (
              <>
                <li><NavLink to="/profile" className={({isActive}) => isActive ? styles.activeStyle : undefined}>PROFILE</NavLink></li>
                <li><NavLink to="/offers/create" className={({isActive}) => isActive ? styles.activeStyle : undefined}>SELL NOW</NavLink></li>
                <li><button onClick={logout} className={styles.logoutButton}>LOGOUT</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={({isActive}) => isActive ? styles.activeStyle : undefined}>LOGIN</NavLink></li>
                <li><NavLink to="/register" className={({isActive}) => isActive ? styles.activeStyle : undefined}>REGISTER</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
}