import React from 'react';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  return (
    <section className={styles['edit-profile-container']}>
      <div className={styles['edit-profile-form']}>
        <h1>Edit Profile</h1>
        <h3>PERSONAL INFO:</h3>
        <form>
          <div className={styles['form-group']}>
            <label for="name">name:</label>
            <input type="text" id="name" value="Ivan Petrov" required />
          </div>
          <div className={styles['form-group']}>
            <label for="phone">phone number:</label>
            <input type="tel" id="phone" value="0885 765 765" required />
          </div>
          <div className={styles['form-group']}>
            <label for="profile-picture">profile picture:</label>
            <input
              type="url"
              id="profile-picture"
              value="https://jhbaghjkug/asughtofj/36"
            />
          </div>
          <div className={styles['form-group']}>
            <label for="contact-email">contact email:</label>
            <input
              type="email"
              id="contact-email"
              value="example@example.eg"
              required
            />
          </div>
          <button type="submit">EDIT PROFILE</button>
        </form>
      </div>
    </section>
  );
}