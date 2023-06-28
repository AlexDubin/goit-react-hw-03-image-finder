import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ keyCode }) => {
    const { onClose } = this.props;
    if (keyCode === 27) {
      onClose();
    }
  };

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  handleClick = (event) => {
    const { onClose } = this.props;
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;
    const { isLoading } = this.state;

    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          {isLoading && <Loader />}
          <img src={imageUrl} alt="" onLoad={this.handleImageLoad} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
