import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import IconPhoto from '../../../Icons/Photo';
import IconPlus from '../../../Icons/Plus';
import DropZone from '../../../DropZone';

const EmbedMenu = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.embedMenu}>
      <div className={styles.item}>
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

      {active &&
        <Fragment>
          <div className={styles.item}>
            <div
              className={styles.iconImage}
            >
              <IconPhoto />
              <DropZone
                className="drop-zone_clip"
                multiple
                onDrop={(file) => {
                  props.onImage(file);
                  setActive(!active);
                  }
                }
              />
            </div>
          </div>
        </Fragment>
      }
    </div>
  );
};

EmbedMenu.propTypes = {
  onImage: PropTypes.func.isRequired,
};

export default EmbedMenu;
