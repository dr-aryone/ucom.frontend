import { compact } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import Image from './Image';
import ImageFromFile from './Image/File';
import { FILE_OBJ } from '../../utils/upload';

const ImagesList = ({ images, onClickRemove }) => {
  const imgs = compact(images);

  if (!imgs.length) {
    return null;
  }

  return (
    <div className={styles.images}>
      {imgs.map((image, index) => {
        if (image instanceof FILE_OBJ) {
          return (
            <ImageFromFile
              key={index}
              file={image}
              onClickRemove={onClickRemove ? () => onClickRemove(index) : null}
            />
          );
        }
        return (
          <Image
            key={index}
            src={image.url}
            onClickRemove={onClickRemove ? () => onClickRemove(index) : null}
          />
        );
      })}
    </div>
  );
};

ImagesList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
    PropTypes.instanceOf(FILE_OBJ),
  ])),
  onClickRemove: PropTypes.func,
};

ImagesList.defaultProps = {
  images: [],
  onClickRemove: null,
};

export default ImagesList;
