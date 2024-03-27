import React from 'react';
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className='notFound'>            
      {/* <h1>404 - Not Found</h1> */}
      <img src="https://image.shutterstock.com/image-vector/404-not-found-error-icon-260nw-1889732020.jpg" alt="not found" />
      <p>The page you are looking for does not exist.</p>
      
    </div>
  );
};

export default NotFound;
