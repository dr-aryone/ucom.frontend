import React, { Fragment, useState } from 'react';
import Popup from '../Popup';
import styles from './styles.css';

const SearchPopup = () => {
  const [popup, showPopup] = useState(false);

  return (
    <Fragment>
      <input onClick={showPopup(!popup)} className={styles.input} placeholder="Search for people, oragnizations, communities, tags, or @accounts in U°OS blockchain…" />

      {/* <div className="layout__search">
        <SearchInput setSearch={onChangeSearch} search={userName} />
      </div> */}

      {popup && (
        <Popup onClick={showPopup(!popup)}>
          <div className={styles.popup}>
            <div className={styles.column}>
              <div className={styles.columnTitle}>Members</div>
            </div>
          </div>
        </Popup>
      )}

    </Fragment>
  );
};

export default SearchPopup;
