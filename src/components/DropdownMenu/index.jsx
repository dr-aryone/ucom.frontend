import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import React, { createRef, memo } from 'react';
import IconDots from '../Icons/Dots';
import styles from './styles.css';

export const DROPDOWN_MENU_ITEM_TYPE_TITLE = 1;
export const DROPDOWN_MENU_ITEM_TYPE_ENTRY = 2;
export const DROPDOWN_MENU_ITEM_TYPE_LOGOUT = 3;

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
                className={classNames({
                  [styles.item]: true,
                  [styles.title]: item.type === DROPDOWN_MENU_ITEM_TYPE_TITLE,
                  [styles.entry]: item.type === DROPDOWN_MENU_ITEM_TYPE_ENTRY,
                  [styles.logout]: item.type === DROPDOWN_MENU_ITEM_TYPE_LOGOUT,
                })}
                onClick={() => {
                  if (tooltipRef.current) {
                    tooltipRef.current.hideTooltip();
                  }

                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.avatar}
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
  items: PropTypes.arrayOf(PropTypes.objectOf({
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([DROPDOWN_MENU_ITEM_TYPE_TITLE, DROPDOWN_MENU_ITEM_TYPE_ENTRY]),
    avatar: PropTypes.node,
  })).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  trigger: PropTypes.string,
  position: PropTypes.string,
  distance: PropTypes.number,
};

DropdownMenu.defaultProps = {
  disabled: false,
  children: null,
  trigger: 'click',
  position: 'bottom-center',
  distance: 10,
};

export default memo(DropdownMenu);
