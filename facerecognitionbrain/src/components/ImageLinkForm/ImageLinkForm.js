import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="prompt-text">
        {
          'This Magic Brain will detect faces in your pictures. Enter a Picture URL'
        }
      </p>
      <div className="form center pa4 br3 shadow-5 ">
        <input className="input-field f4 pv2" type="text" onChange={onInputChange} />
        <button
          className="submit-btn grow f4 link ph3 pv2 white bg-light-purple"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
