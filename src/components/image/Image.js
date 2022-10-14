import React from 'react';
import './Image.css';

export default function Image({ src }) {
  return (
    <div className="img-input">
      <img src={src} alt="logo" className="img" />
    </div>
  );
}
