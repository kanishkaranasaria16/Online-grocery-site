import React from 'react';
import home from '../IMAGE/home1.webp'; 
import { Link } from 'react-router-dom';
const BANNER = () => {

  return (
    <div>
      <div className='homeBannerSection'>
          <div className='item'>
            <Link to ="/">
            <img src={home} alt="img" className='w-100' />
            </Link>
          </div>
      </div>
    </div>
  );
};

export default BANNER;