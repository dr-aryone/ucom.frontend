import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.css';
import IconUpload from './IconUpload';
import UserPick from '../../UserPick/UserPick';

const Avatar = (props) => {
  const [dropActive, setDropActive] = useState(false);

  return (
    <div
      className={classNames({
        [styles.avatar]: true,
        [styles.organization]: props.organization,
      })}
    >
      <UserPick
        stretch
        organization={props.organization}
        src={props.src}
        alt={props.alt}
      />

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
          onDropAccepted={files => props.onChange && props.onChange(files[0])}
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
  onChange: PropTypes.func,
  organization: PropTypes.bool,
};

Avatar.defaultProps = {
  src: null,
  alt: null,
  changeEnabled: false,
  organization: false,
  onChange: null,
};

export default Avatar;
