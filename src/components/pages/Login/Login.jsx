import React from 'react';
import styles from './Login.module.css';

export default function Login() {
  return (
<section className={styles['login-container']}>
      <div className={styles['login-form']}>
        <h1>Login</h1>
        <form>
          <label for="email">email:</label>
          <input
            type="email"
            id="email"
            placeholder="e.g: renew@example.com"
            required
          />
          <label for="password">password:</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <p>Don’t have an account? <a href="#">Register now</a></p>
      </div>
      <div className={styles['login-image']}>
        <img src="./flowers.png" alt="Login background" />
      </div>
    </section>
  );
}