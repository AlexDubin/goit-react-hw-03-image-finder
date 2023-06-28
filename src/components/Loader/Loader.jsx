import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ColorRing
        visible={true}
        height={80}
        width={80}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#6DA7D2', '#4F8EBE', '#3B79A7', '#28638F', '#19507A']}
      />
    </div>
  );
};

export default Loader;
