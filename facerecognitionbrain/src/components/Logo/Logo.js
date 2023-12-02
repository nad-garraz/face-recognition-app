import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <Tilt className="Tilt">
        <div className="Tilt-inner">
          <img src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
