import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import UserPick from '../UserPick/UserPick';
import { formatRate } from '../../utils/rate';
import styles from './styles.css';

// TODO: Remove and replace another cards
const EntryCard = (props) => {
  const LinkTag = props.disabledLink ? 'span' : props.isExternal ? 'a' : Link;

  return (
    <div className={styles.entryCard}>
      <div className={styles.userPick}>
        <LinkTag
          title={props.title}
          to={props.url}
          href={props.url}
          target={props.isExternal ? '_blank' : undefined}
        >
          <UserPick shadow organization={props.organization} src={props.avatarSrc} />
        </LinkTag>
      </div>
      <div className={styles.title}>
        <LinkTag
          title={props.title}
          to={props.url}
          href={props.url}
          target={props.isExternal ? '_blank' : undefined}
        >
          {props.title}
        </LinkTag>
      </div>
      <div className={styles.nickname}>
        <LinkTag
          title={props.title}
          to={props.url}
          href={props.url}
          target={props.isExternal ? '_blank' : undefined}
        >
          {props.disableSign ? null : props.organization ? '/' : '@'}{props.nickname}
        </LinkTag>
      </div>
      {!props.disableRate &&
        <div className={styles.rate}>
          {formatRate(props.currentRate)}°
        </div>
      }
    </div>
  );
};

export const entryCardPropTypes = {
  organization: PropTypes.bool,
  avatarSrc: PropTypes.string,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  currentRate: PropTypes.number,
  disabledLink: PropTypes.bool,
  disableRate: PropTypes.bool,
  disableSign: PropTypes.bool,
  isExternal: PropTypes.bool,
};

EntryCard.propTypes = entryCardPropTypes;

EntryCard.defaultProps = {
  organization: false,
  avatarSrc: null,
  currentRate: null,
  disabledLink: false,
  disableRate: false,
  disableSign: false,
  isExternal: false,
};

export default EntryCard;
