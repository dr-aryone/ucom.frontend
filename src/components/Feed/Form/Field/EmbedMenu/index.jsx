import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import IconPhoto from '../../../../Icons/Photo';
import IconPoll from '../../../../Icons/Poll';
import IconPlus from '../../../../Icons/Plus';
import { UPLOAD_SIZE_LIMIT, UPLOAD_SIZE_LIMIT_ERROR } from '../../../../../utils/upload';
import { addErrorNotification } from '../../../../../actions/notifications';

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
            <label
              title="Add iamge"
              className={styles.iconImage}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file.size >= UPLOAD_SIZE_LIMIT) {
                    props.addErrorNotification(UPLOAD_SIZE_LIMIT_ERROR);
                  } else {
                    props.onChangeImage(file);
                  }

                  setActive(false);
                }}
              />
              <IconPhoto />
            </label>
          </div>
          <div className={styles.item}>
            <button
              title="Add poll"
              type="button"
              className={styles.icon}
              onClick={() => {
                setActive(false);

                if (props.onClickPoll) {
                  props.onClickPoll();
                }
              }}
            >
              <IconPoll />
            </button>
          </div>
        </Fragment>
      }
    </div>
  );
};

EmbedMenu.propTypes = {
  addErrorNotification: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onClickPoll: PropTypes.func,
};

EmbedMenu.defaultProps = {
  onClickPoll: null,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(EmbedMenu);
