import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box: boxes }) => {
  console.log("FaceRecognition Component");
  return (
    <div className="flex flex-col">
      <div className="center relative">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxes.map((caja) => {
          console.log("caja: ", caja);
          return (
            <div
              className="bounding-box"
              style={{
                top: caja.topRow,
                right: caja.rightCol,
                bottom: caja.bottomRow,
                left: caja.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
