import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.css';
import IconPhoto from '../../../Icons/Photo';
import IconPlus from '../../../Icons/Plus';
import DropZone from '../../../DropZone';

const EmbedMenu = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.embedMenu}>
      <div className={styles.mainItem}>
        <button
          title="Toggle menu"
          type="button"
          className={classNames({
            [styles.trigger]: true,
            [styles.triggerActive]: active,
          })}
          onClick={() => {
            setActive(!active);
          }}
        >
          <IconPlus />
        </button>
      </div>
      <div
        className={classNames({
            [styles.item]: true,
            [styles.active]: active,
          })}
      >
        <div
          className={styles.iconImage}
        >
          <IconPhoto />
          <DropZone
            className="drop-zone_clip"
            multiple
            onDrop={(files) => {
              props.onImage(files);
              setActive(!active);
            }}
          />
        </div>
      </div>
    </div>
  );
};

EmbedMenu.propTypes = {
  onImage: PropTypes.func.isRequired,
};

export default EmbedMenu;
