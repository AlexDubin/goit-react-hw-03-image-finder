import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onItemClick }) => {
  return (
    <li className={css.item} onClick={() => onItemClick(image.largeImageURL)}>
      <img className={css.img} src={image.webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
