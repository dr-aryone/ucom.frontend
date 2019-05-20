import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Comments/Form/Image';
import { removeGalleryImage } from '../../utils/entityImages';
import styles from './styles.css';

const PreviewImagesGrid = ({
  isExistGalleryImages, galleryImages, setEntityImages, entityImages,
}) => (
  <div className={styles.list}>
    {isExistGalleryImages &&
      galleryImages.map((url, index) => (
        <Image
          key={index}
          src={url}
          isMultiple={galleryImages.length > 1}
          onClickRemove={() => {
            setEntityImages(removeGalleryImage(entityImages, index));
          }}
        />
      ))
    }
  </div>
);

PreviewImagesGrid.propTypes = {
  isExistGalleryImages: PropTypes.bool.isRequired,
  galleryImages: PropTypes.arrayOf(PropTypes.any).isRequired,
  setEntityImages: PropTypes.func.isRequired,
  entityImages: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PreviewImagesGrid;
