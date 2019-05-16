import classNames from 'classnames';
import { Link } from 'react-scroll';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const VerticalMenu = props => (
  <nav
    className={classNames({
      [styles.verticalMenu]: true,
      [styles.sticky]: props.sticky,
    })}
    style={{
      top: props.sticky ? `${props.stickyTop}px` : undefined,
    }}
  >
    {props.sections.map((section, index) => (
      <Link
        {...props.scrollerOptions}
        key={index}
        className={styles.item}
        to={section.name}
      >
        {section.title}
      </Link>
    ))}
  </nav>
);

VerticalMenu.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  scrollerOptions: PropTypes.shape({
    duration: PropTypes.number,
    delay: PropTypes.number,
    smooth: PropTypes.bool,
    offset: PropTypes.number,
    containerId: PropTypes.string,
  }),
  sticky: PropTypes.bool,
  stickyTop: PropTypes.number,
};

VerticalMenu.defaultProps = {
  scrollerOptions: {
    spy: true,
    duration: 1500,
    delay: 100,
    smooth: true,
    offset: -115,
  },
  sticky: false,
  stickyTop: 120,
};

export default VerticalMenu;
