import React from 'react';
import IconLogo from '../Icons/Logo';
import MiniIconLogo from '../Icons/MiniLogo';
import styles from './styles.css';

const Logo = () => (
  <div className={styles.logo}>
    <span className={`${styles.icon} ${styles.mini}`}>
      <MiniIconLogo />
    </span>
    <span className={`${styles.icon} ${styles.default}`}>
      <IconLogo />
    </span>
  </div>
);

export default Logo;
