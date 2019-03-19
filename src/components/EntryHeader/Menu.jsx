import { Tooltip } from 'react-tippy';
import React, { useState } from 'react';
import IconDots from '../Icons/Dots';
import tooltipMenuStyles from '../TooltipMenu/styles.css';
import { copyToClipboard } from '../../utils/text';
import styles from './styles.css';

// TODO: Replace with DropdownMenu
const Menu = () => {
  const [tooltipVisibility, setTooltipVisibility] = useState(false);

  return (
    <div className={styles.menu}>
      <Tooltip
        arrow
        useContext
        interactive
        theme="dropdown"
        position="bottom-center"
        trigger="click"
        open={tooltipVisibility}
        onRequestClose={() => setTooltipVisibility(false)}
        html={(
          <div className={tooltipMenuStyles.tooltipMenu}>
            <div
              role="presentation"
              className={tooltipMenuStyles.item}
              onClick={() => {
                setTooltipVisibility(false);
                copyToClipboard(window.location.href);
              }}
            >
              Copy Link
            </div>
          </div>
        )}
      >
        <div
          role="presentation"
          className={styles.menuTrigger}
          onClick={() => setTooltipVisibility(!tooltipVisibility)}
        >
          <IconDots />
        </div>
      </Tooltip>
    </div>
  );
};

export default Menu;
