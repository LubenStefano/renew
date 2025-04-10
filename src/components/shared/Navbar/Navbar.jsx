import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useLogout } from '../../../hooks/useAuth';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export default function Navbar() {
  const { user } = useUser();
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const navLinks = (
    <>
      <li><NavLink to="/" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>HOME</NavLink></li>
      <li><NavLink to="/offers" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>PRODUCTS</NavLink></li>
      <li><NavLink to="/location" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>LOCATION</NavLink></li>
      {user ? (
        <>
          <li><NavLink to={`/profile/${user.id}`} onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>PROFILE</NavLink></li>
          <li><NavLink to={`/savedOffers/${user.id}`} onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>SAVED OFFERS</NavLink></li>
          <li><NavLink to="/offers/create" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>SELL NOW</NavLink></li>
          <li><button onClick={() => { logout(); onClose(); }} className={styles.logoutButton}>LOGOUT</button></li>
        </>
      ) : (
        <>
          <li><NavLink to="/login" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>LOGIN</NavLink></li>
          <li><NavLink to="/register" onClick={onClose} className={({ isActive }) => isActive ? styles.activeStyle : undefined}>REGISTER</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}><NavLink to={"/"}>ReNew</NavLink></div>

      {/* DESKTOP NAVIGATION */}
      <nav className={`${styles.nav} ${styles.desktopOnly}`}>
        <ul className={styles.navList}>
          {navLinks}
        </ul>
      </nav>

      {/* MOBILE BURGER BUTTON */}
      <div className={styles.mobileOnly}>
        <Button icon={<MenuOutlined style={{ fontSize: 35 }} />} onClick={showDrawer} style={{ backgroundColor: "transparent", border: "none"}} />
      </div>

      {/* MOBILE DRAWER MENU */}
      <Drawer title="MENU" placement="right" onClose={onClose} open={open} >
        <ul className={styles.navListMobile}>
          {navLinks}
        </ul>
      </Drawer>
    </header>
  );
}
