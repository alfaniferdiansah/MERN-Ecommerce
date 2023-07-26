import React from 'react';
import "./Loader.css";

const Loader = () => {
  return(
    <div className="w-full h-screen flex items-center justify-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <div>Loading.....</div>
    </div>
  )
};

export default Loader;
