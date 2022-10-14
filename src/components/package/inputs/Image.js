import React from 'react';
import './Image.css';

export default function Image({ src, updateImageOnclick, console }) {
  return (
    <div className="img-input" onClick={console}>
      <img src={src} alt="logo" className="img" onClick={updateImageOnclick} />
    </div>
  );
}
