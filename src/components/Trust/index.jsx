import PropTypes from 'prop-types';
import React, { memo, useState, Fragment } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import UserPick from '../UserPick/UserPick';
import DropdownMenu from '../DropdownMenu';
import Popup from '../Popup';
import ModalContent from '../ModalContent';

const Trust = (props) => {
  const [untrustPopupVisible, setUntrustPopupVisible] = useState(false);

  return (
    <Fragment>
      {untrustPopupVisible &&
        <Popup onClickClose={() => setUntrustPopupVisible(false)}>
          <ModalContent onClickClose={() => setUntrustPopupVisible(false)}>
            test
          </ModalContent>
        </Popup>
      }

      <div className={styles.trust}>
        <Button strech grayBorder>
          Trust&nbsp;
          <UserPick
            size={24}
            alt={props.userName}
            src={props.userAvtarUrl}
            shadow
          />
          &nbsp;<span title={props.userName}>{props.userName}</span>
        </Button>

        <div className={styles.trusted}>
          <DropdownMenu
            distance={15}
            trigger="mouseenter"
            items={[{
              title: 'Change my mind',
              onClick: () => setUntrustPopupVisible(true),
            }]}
          >
            <span className={styles.trigger}>
              You Trust&nbsp;
              <UserPick
                size={24}
                alt={props.userName}
                src={props.userAvtarUrl}
                shadow
              />
              &nbsp;<span title={props.userName}>{props.userName}</span>
            </span>
          </DropdownMenu>
        </div>

        <div className={styles.acceptCard}>
          <h3 className={styles.title}>
            I Trust&nbsp;
            <UserPick
              size={32}
              alt={props.userName}
              src={props.userAvtarUrl}
              shadow
            />
            &nbsp;<span title={props.userName}>{props.userName}</span>
          </h3>

          <ol className={styles.rules}>
            <li>You are publicly manifesting your trust to this person.</li>
            <li>Your public trust manifestation is a transaction on the U°OS blockchain.</li>
            <li>This trust transaction will be put in your profile feed and the feed of your followers.</li>
            <li>The profiles that you trust will be publicly listed in your profile.</li>
            <li>This trust transaction expands the web of trust within the network.</li>
          </ol>

          <div className={styles.action}>
            <Button strech red>Trust</Button>
          </div>

          <div className={styles.action}>
            <Button strech transparent>Cancel</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Trust.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvtarUrl: PropTypes.string.isRequired,
};

export default memo(Trust);
