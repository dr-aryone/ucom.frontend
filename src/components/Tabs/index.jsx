import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './styles.css';

const Tabs = props => (
  <div
    className={classNames({
      [styles.tabs]: true,
      [styles.capitalize]: props.capitalize,
      [styles.noBorder]: props.noBorder,
      [styles.withIndent]: props.withIndent,
      [styles.responsive]: props.responsive,
      [props.theme]: !!props.theme,
    })}
  >
    {props.items.map((item, index) => {
      const LinkTag = item.url ? NavLink : 'span';

      return (
        <LinkTag
          activeClassName={styles.active}
          role={!item.url ? 'presentation' : undefined}
          key={index}
          to={item.url}
          className={classNames({
            [styles.item]: true,
            [styles.active]: item.active,
          })}
          onClick={item.onClick}
        >
          {item.title}
        </LinkTag>
      );
    })}
  </div>
);

Tabs.propTypes = {
  noBorder: PropTypes.bool,
  capitalize: PropTypes.bool,
  withIndent: PropTypes.bool,
  responsive: PropTypes.bool,
  theme: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
  })),
};

Tabs.defaultProps = {
  noBorder: false,
  capitalize: false,
  withIndent: false,
  responsive: false,
  theme: undefined,
  items: [],
};

export default Tabs;
