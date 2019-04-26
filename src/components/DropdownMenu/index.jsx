import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { createRef, memo } from 'react';
import IconDots from '../Icons/Dots';
import styles from './styles.css';

const DropdownMenu = (props) => {
  const tooltip = createRef();

  return (
    <Tooltip
      ref={tooltip}
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
          {props.items.map((item, id) => {
            const LinkTag = item.url ? Link : 'button';

            return (
              <LinkTag
                key={id}
                to={item.url}
                className={classNames({ [styles.item]: true, [styles.disabled]: item.disabled })}
                onClick={() => {
                  if (tooltip.current) {
                    tooltip.current.hideTooltip();
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
          <button
            onClick={props.onClickButton}
            className={styles.button}
          >
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
    disabled: PropTypes.bool,
  })).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  trigger: PropTypes.string,
  position: PropTypes.string,
  distance: PropTypes.number,
  onClickButton: PropTypes.func,
};

DropdownMenu.defaultProps = {
  disabled: false,
  children: null,
  onClickButton: null,
  trigger: 'click',
  position: 'bottom-center',
  distance: 10,
};

export default memo(DropdownMenu);
