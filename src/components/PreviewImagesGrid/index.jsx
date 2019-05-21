import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Comments/Form/Image';
import PreloaderImage from '../Comments/Form/PreloaderImage';
import { removeGalleryImage } from '../../utils/entityImages';
import styles from './styles.css';

const PreviewImagesGrid = ({
  isExistGalleryImages, setEntityImages, entityImages,
}) => (
  <div className={styles.list}>
    {isExistGalleryImages &&
      entityImages.gallery.map((image, index) => (
       image.url ?
         <Image
           key={index}
           src={image.url}
           isMultiple={entityImages.gallery.length > 1}
           onClickRemove={() => {
              setEntityImages(removeGalleryImage(entityImages, index));
            }}
         /> :
         <PreloaderImage
           key={index}
         />
      ))
    }
  </div>
);

PreviewImagesGrid.propTypes = {
  isExistGalleryImages: PropTypes.bool.isRequired,
  setEntityImages: PropTypes.func.isRequired,
  entityImages: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PreviewImagesGrid;
