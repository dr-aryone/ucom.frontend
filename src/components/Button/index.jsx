import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import styles from './styles.css';

const Button = (props) => {
  const Tag = props.url ? props.external ? 'a' : Link : 'button';

  return (
    <Tag
      to={props.url}
      href={props.url}
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
  cap: false,
  disabled: false,
};

export default memo(Button);
