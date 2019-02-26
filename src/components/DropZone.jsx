import React, { useState } from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { UPLOAD_SIZE_LIMIT, UPLOAD_SIZE_LIMIT_ERROR } from '../utils/upload';

const DropZone = ({
  text,
  accept,
  onDrop,
  className,
  multiple,
  minWidth,
  minHeight,
  maxSize,
}) => {
  const [error, setError] = useState(null);

  return (
    <div className={classNames('drop-zone', className)}>
      <Dropzone
        multiple={multiple}
        accept={accept}
        maxSize={maxSize}
        className="drop-zone__input"
        onDrop={(files) => {
          // TODO: Refactoring for multiple files
          if (!files[0] || !files[0].size >= maxSize) {
            setError(UPLOAD_SIZE_LIMIT_ERROR);
            return;
          }

          const fileReader = new FileReader();

          fileReader.onload = () => {
            const img = new Image();

            img.onload = () => {
              if (minWidth && img.width < minWidth) {
                setError(`Width of image should be at least ${minWidth} pixels`);
                return;
              }

              if (minHeight && img.height < minHeight) {
                setError(`Height of image should be at least ${minHeight} pixels`);
                return;
              }

              setError(null);
              onDrop(files);
            };

            img.src = fileReader.result;
          };

          if (files[0] !== []) {
            fileReader.readAsDataURL(files[0]);
          }
        }}
      >
        <span className="drop-zone__text">{text}</span>
      </Dropzone>

      {error &&
        <div className="drop-zone__error">{error}</div>
      }
    </div>
  );
};

DropZone.propTypes = {
  text: PropTypes.string,
  accept: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxSize: PropTypes.number,
};

DropZone.defaultProps = {
  text: 'Drop image here',
  accept: null,
  className: null,
  multiple: false,
  minWidth: null,
  minHeight: null,
  maxSize: UPLOAD_SIZE_LIMIT,
};

export default DropZone;
