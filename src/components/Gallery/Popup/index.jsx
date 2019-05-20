import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import styles from './styles.css';
import Popup from '../../Popup';
import IconClose from '../../Icons/Close';
import ArrowRight from '../../Icons/GalleryArrowRight';
import UserCard from '../../UserCard/UserCard';
import { isRightArrowKey, isLeftArrowKey } from '../../../utils/keyboard';

const GalleryPopup = (props) => {
  if (!props.images.length) {
    return null;
  }

  const { activeIndex, setActiveIndex } = props;

  const canMoveLeft = activeIndex - 1 >= 0;
  const canMoveRight = activeIndex + 1 < props.images.length;

  const moveLeft = () =>
    (canMoveLeft ? setActiveIndex(activeIndex - 1) : null);

  const moveRight = () =>
    (canMoveRight ? setActiveIndex(activeIndex + 1) : null);

  const onKeyDown = (event) => {
    if (isLeftArrowKey(event)) {
      moveLeft();
    } else if (isRightArrowKey(event)) {
      moveRight();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <Popup
      mod="dark"
      onClickClose={() => props.onClickClose()}
    >
      <div
        role="presentation"
        className={styles.close}
        onClick={() => props.onClickClose()}
      >
        <IconClose />
      </div>

      <div className={styles.popup}>
        <div className={styles.container}>
          <div
            role="presentation"
            onClick={moveLeft}
            className={classNames({
              [styles.arrow]: true,
              [styles.leftArrow]: true,
              [styles.active]: canMoveLeft,
            })}
          >
            <div className={styles.arrowBlock}>
              <div className={styles.rotate}>
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className={styles.viewport}>
            <img
              className={styles.image}
              src={props.images[activeIndex].url}
              alt={props.images[activeIndex].alt}
            />
          </div>
          <div
            role="presentation"
            onClick={moveRight}
            className={classNames({
              [styles.arrow]: true,
              [styles.active]: canMoveRight,
            })}
          >
            <div className={styles.arrowBlock}>
              <ArrowRight />
            </div>
          </div>
        </div>


        <div className={styles.toolbar}>
          <div className={styles.userCard}>
            {props.date &&
              <div className={styles.date}>{props.date}</div>
            }
            <UserCard userId={props.userId} />
          </div>
          <div className={styles.thumbs}>
            {// empty blocks
           }
            {props.images.map((image, index) => (
              <div
                key={image.url}
                role="presentation"
                className={styles.thumbWrapper}
                level={index - activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  className={styles.thumb}
                  src={image.url}
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
          <div className={styles.counter}>
            {activeIndex + 1} / {props.images.length}
          </div>
        </div>
      </div>
    </Popup>
  );
};

GalleryPopup.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  userId: PropTypes.number,
  date: PropTypes.string,
  onClickClose: PropTypes.func.isRequired,
};

GalleryPopup.defaultProps = {
  images: [],
  userId: null,
  date: null,
};

export default GalleryPopup;
