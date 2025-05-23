import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loader;
