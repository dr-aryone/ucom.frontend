import PropTypes from 'prop-types';
import React, { memo, useState, Fragment } from 'react';
import styles from './styles.css';
import IconArrowRight from '../Icons/ArrowRight';
import Popup from '../Popup';
import IconClose from '../Icons/Close';
import Button from '../Button/index';
import CopyPanel from '../CopyPanel';

const SaveSocialKey = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [hasCopiedKey, setHasCopiedKey] = useState(false);

  return (
    <Fragment>
      {popupVisible &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <div className={styles.copyPopup}>
            <span className={styles.close}>
              <span
                role="presentation"
                className={styles.icon}
                onClick={() => setPopupVisible(false)}
              >
                <IconClose />
              </span>
            </span>
            <h3 className={styles.title}>Copy Your Social Key and Save It</h3>
            <p className={styles.text}>This key is your way to authorize on a platform, it much safer and simplier than Brainkey. Keep it somewhere safe!</p>
            <div className={styles.action}>
              <Button
                big
                cap
                red
                strech
                onClick={props.onClickBack}
              >
                GOT IT
              </Button>
            </div>
          </div>
        </Popup>
      }
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.form}>
            <h2 className={`${styles.title} ${styles.saveKey}`}>Save Your Social Key</h2>
            <div className={styles.copy}>
              <CopyPanel
                value={props.socialKey}
                onCopy={() => {
                  setHasCopiedKey(true);
                }}
              />
            </div>
            <div className={styles.saveKeyText}>
              This is your Social Private Key.<br />
              <strong>You will need it to authorize on a platform</strong> from any device. Keep it safe.
            </div>
            <div className={styles.proceedLink}>
              <span
                role="presentation"
                className={styles.navLink}
                onClick={() => {
                  if (!hasCopiedKey) {
                    setPopupVisible(true);
                    return;
                  }
                  props.onClickBack();
                }}
              >
                <span className={styles.navText}>Proceed to Authorization</span>
                <IconArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SaveSocialKey.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  socialKey: PropTypes.string.isRequired,
};

export default memo(SaveSocialKey);
