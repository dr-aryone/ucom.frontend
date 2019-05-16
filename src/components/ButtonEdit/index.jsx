import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import IconEdit from '../Icons/Edit';
import styles from './styles.css';

const ButtonEdit = (props) => {
  const ButtonTag = props.onClick ? 'span' : Link;

  return (
    <ButtonTag
      className={classNames({
        [styles.buttonEdit]: true,
        [styles.strech]: props.strech,
      })}
      to={props.url}
      onClick={props.onClick}
    >
      <IconEdit />
    </ButtonTag>
  );
};

ButtonEdit.propTypes = {
  url: PropTypes.string,
  strech: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonEdit.defaultProps = {
  strech: false,
  onClick: undefined,
  url: undefined,
};

export default ButtonEdit;
