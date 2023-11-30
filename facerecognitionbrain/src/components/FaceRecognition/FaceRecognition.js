import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box: boxes }) => {
  console.log("FaceRecognition");
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
        {boxes.map((box) => {
          console.log(box);
          return (
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
