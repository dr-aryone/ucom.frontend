import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import IconDots from '../Icons/Dots';
import styles from './styles.css';
import tooltipMenuStyles from '../TooltipMenu/styles.css'; // TODO: Move to this ./styles.css

// TODO: Replace all another dropdown
const DropdownMenu = (props) => {
  const [tooltipVisibility, setTooltipVisibility] = useState(false);

  return (
    <Tooltip
      arrow
      useContext
      interactive
      disabled={props.disabled}
      theme="dropdown"
      position="bottom-center"
      trigger="click"
      open={tooltipVisibility}
      onRequestClose={() => setTooltipVisibility(false)}
      html={(
        <div className={tooltipMenuStyles.tooltipMenu}>
          {props.items.map((item) => {
            const LinkTag = item.url ? Link : 'button';

            return (
              <LinkTag
                key={item.title}
                to={item.url}
                className={tooltipMenuStyles.item}
                onClick={() => {
                  setTooltipVisibility(false);
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
      <div className={styles.icon}>
        <button
          className={styles.button}
          onClick={() => setTooltipVisibility(!tooltipVisibility)}
        >
          <IconDots />
        </button>
      </div>
    </Tooltip>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  disabled: PropTypes.bool,
};

DropdownMenu.defaultProps = {
  disabled: false,
};

export default DropdownMenu;
