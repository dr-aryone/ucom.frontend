import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.css';
import IconUpload from './IconUpload';
import IconUser from './IconUser';

const Avatar = (props) => {
  const [dropActive, setDropActive] = useState(false);

  return (
    <div className={styles.avatar}>
      {props.src ? (
        <div className={styles.imageWrapper}>
          <img src={props.src} alt={props.alt} />
        </div>
      ) : (
        <div className={styles.blank}>
          <IconUser />
        </div>
      )}

      {props.changeEnabled &&
        <Dropzone
          multiple={false}
          accept="image/jpeg, image/png, image/gif"
          className={classNames({
            [styles.upload]: true,
            [styles.uploadActive]: dropActive,
          })}
          onDragEnter={() => setDropActive(true)}
          onDragLeave={() => setDropActive(false)}
          onDrop={() => setDropActive(false)}
          onDropAccepted={files => props.onChange(files[0])}
        >
          <span className={styles.uploadIcon}>
            <IconUpload />
          </span>
          <span className={styles.uploadLabel}>Upload</span>
        </Dropzone>
      }
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  changeEnabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Avatar.defaultProps = {
  src: null,
  alt: null,
  changeEnabled: false,
};

export default Avatar;
