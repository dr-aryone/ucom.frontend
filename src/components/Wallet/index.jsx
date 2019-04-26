import React from 'react';
import Tokens from '../Resources/Tokens';
import Transfers from '../Resources/Transfers';
import styles from './styles.css';

// TODO: remove menu-wallet.less nad fix dependencies
const Wallet = () => (
  <div className={styles.wallet}>
    <div className={styles.section}>
      <h2 className={styles.title}>Wallet</h2>
      <Tokens />
    </div>
    <div className={styles.section}>
      <h2 className={styles.title}>Transfers</h2>
      <Transfers />
    </div>
  </div>
);

export default Wallet;
