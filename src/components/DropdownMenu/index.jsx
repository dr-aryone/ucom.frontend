import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import React, { createRef, memo } from 'react';
import IconDots from '../Icons/Dots';
import styles from './styles.css';

const DropdownMenu = (props) => {
  const tooltipRef = createRef();

  return (
    <Tooltip
      ref={tooltipRef}
      arrow
      useContext
      interactive
      disabled={props.disabled}
      theme="dropdown"
      distance={props.distance}
      position={props.position}
      trigger={props.trigger}
      html={(
        <div className={styles.tooltipMenu}>
          {props.items.map((item) => {
            const LinkTag = item.url ? Link : 'button';

            return (
              <LinkTag
                key={item.title}
                to={item.url}
                className={styles.item}
                onClick={() => {
                  if (tooltipRef.current) {
                    tooltipRef.current.hideTooltip();
                  }

                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.title}
              </LinkTag>
            );
          })}
        </div>
      )}
    >
      {props.children ||
        <div className={styles.icon}>
          <button className={styles.button}>
            <IconDots />
          </button>
        </div>
      }
    </Tooltip>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  trigger: PropTypes.string,
  position: PropTypes.string,
  distance: PropTypes.number,
  visible: PropTypes.bool,
};

DropdownMenu.defaultProps = {
  disabled: false,
  children: null,
  trigger: 'click',
  position: 'bottom-center',
  distance: 10,
  visible: undefined,
};

export default memo(DropdownMenu);
