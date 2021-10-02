import React from 'react';
import { Link } from '@core/components/Link';
import styles from './App.module.css';

export const App = () => (
  <div className={styles.app}>
    <h1 className={styles.title}>Hello, I&lsquo;m Pet Starter</h1>
    <div className={styles.logo}>
      <span className={styles.logoInner}>🐶</span>
    </div>
    <Link className={styles.button} to="/details/someId">
      Go to details page!
    </Link>
  </div>
);
