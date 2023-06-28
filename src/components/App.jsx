import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './app.module.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '37930503-8d8d6a4cdb4ba6645e7575bb7';
const BASE_URL =
  'https://pixabay.com/api/?key=your_key&image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    modalImageUrl: '',
    error: null,
  };

  handleSearch = async (newQuery) => {
    this.setState({ query: newQuery, page: 1, images: [], error: null });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleImageClick = (imageUrl) => {
    this.setState({ modalImageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ modalImageUrl: '' });
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true, error: null });

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          page,
        },
      });

      if (response.data.hits.length === 0) {
        throw new Error(`No images for "${query}".`);
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, modalImageUrl, error } = this.state;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleSearch} />

        {error ? (
          <p>{error}</p>
        ) : (
          <ImageGallery images={images} onItemClick={this.handleImageClick} />
        )}

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}

        {modalImageUrl && (
          <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.array,
  isLoading: PropTypes.bool,
  modalImageUrl: PropTypes.string,
  error: PropTypes.string,
};

export default App;
