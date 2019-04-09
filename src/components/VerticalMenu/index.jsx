import classNames from 'classnames';
import { scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styles from './styles.css';

const VerticalMenu = (props) => {
  const [activeSectionName, setActiveSectionName] = useState(props.activeSectionName || props.sections[0].name);

  useEffect(() => {
    setActiveSectionName(props.sections[0].name);
  }, [props.sections]);

  useEffect(() => {
    setActiveSectionName(props.activeSectionName);
  }, [props.activeSectionName]);

  return (
    <nav className={styles.verticalMenu}>
      <ul className={styles.list}>

        {props.sections.map(section => (
          <li
            role="presentation"
            className={classNames({
              [styles.item]: true,
              [styles.active]: activeSectionName === section.name,
            })}
            onClick={() => {
              scroller.scrollTo(section.name, {
                duration: 1500,
                delay: 100,
                smooth: true,
                offset: -115,
              });
              setActiveSectionName(section.name);
            }}
          >
            {section.title}
          </li>
        ))}
      </ul>
    </nav>
  );
};

VerticalMenu.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  activeSectionName: PropTypes.string,
};

VerticalMenu.defaultProps = {
  activeSectionName: undefined,
};

export default VerticalMenu;
