import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import styles from './styles.css';
import { filterURL } from '../../utils/url';

const Button = (props) => {
  const Tag = props.url ? props.external ? 'a' : Link : 'button';

  return (
    <Tag
      to={props.url}
      href={filterURL(props.url)}
      target={props.external ? '_blank' : undefined}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classNames({
        [styles.button]: true,
        [styles.strech]: props.strech,
        [styles.grayBorder]: props.grayBorder,
        [styles.red]: props.red,
        [styles.transparent]: props.transparent,
        [styles.big]: props.big,
        [styles.small]: props.small,
        [styles.medium]: props.big,
        [styles.cap]: props.cap,
        [styles.disabled]: props.disabled,
      })}
    >
      <div className={styles.inner}>
        {props.children}
      </div>
    </Tag>
  );
};

Button.propTypes = {
  url: PropTypes.string,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  strech: PropTypes.bool,
  grayBorder: PropTypes.bool,
  red: PropTypes.bool,
  transparent: PropTypes.bool,
  big: PropTypes.bool,
  small: PropTypes.bool,
  cap: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  url: null,
  external: false,
  onClick: null,
  strech: false,
  grayBorder: false,
  red: false,
  transparent: false,
  big: false,
  small: false,
  cap: false,
  disabled: false,
};

export default memo(Button);
