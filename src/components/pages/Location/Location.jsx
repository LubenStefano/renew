import React, { useRef, useState } from 'react';
import styles from './Location.module.css';
import useCityMap from '../../../hooks/useCityMap';

export default function Location() {
  const mapRef = useRef(null);
  const [city, setCity] = useState('Sofia');

  useCityMap(mapRef, city);

  return (
    <main className={styles.location}>
      <h1 className={styles.title}>Our Location</h1>
      <div className={styles.citySelector}>
        <label htmlFor="city">Choose a city:</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.cityDropdown}
        >
          <option value="Sofia">Sofia</option>
          <option value="Plovdiv">Plovdiv</option>
          <option value="Varna">Varna</option>
        </select>
      </div>
      <div ref={mapRef} className={styles.mapContainer}></div>
      <section className={styles.info}>
        <h2>Why Visit Us?</h2>
        <p>
          At ReNew, we are committed to providing the best experience for our customers. 
          Visit one of our offices to:
        </p>
        <ul>
          <li>Get personalized assistance with your purchases or sales.</li>
          <li>Learn more about our mission to promote sustainability through second-hand products.</li>
          <li>Meet our friendly team and explore our latest offerings in person.</li>
        </ul>
        <p>
          Our office is located in the heart of {city}, making it easily accessible for everyone. 
          We look forward to welcoming you!
        </p>
      </section>
    </main>
  );
}
