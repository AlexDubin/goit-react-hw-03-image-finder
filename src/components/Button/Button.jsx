import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, disabled }) => {
  return (
    <button type='button' className={css.button} onClick={onClick} disabled={disabled}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
