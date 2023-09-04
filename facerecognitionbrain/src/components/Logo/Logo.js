import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className='ma4 mt0' style={{ width: "200px" }}>
      <Tilt className='Tilt'>
        <div
          className='Tilt-inner'
          style={{
            height: "200px",
            width: "200px",
            border: "5px dashed black",
            padding: '30px'
          }}
        >
          <img src={brain} alt='Logo' />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
