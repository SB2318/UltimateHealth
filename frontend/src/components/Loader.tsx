/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loader = () => {
  return (
    <LoadingSpinner
      fullScreen
      size={50}
      text="Please wait..."
      subText="We're processing your request"
    />
  );
};

export default Loader;
