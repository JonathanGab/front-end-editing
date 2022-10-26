import React from 'react';
import './Image.css';
import TextField from '@mui/material/TextField';

export default function Image({
  src,
  imagePosition,
  updateImageOnclick,
  console,
  altDefaultValue,
  onClickImageInput,
  onChangeImageInput,
}) {
  return (
    <div className="img-input" onClick={console}>
      <div className="position">{imagePosition}</div>
      <img src={src} alt="logo" className="img" onClick={updateImageOnclick} />
      <div className="image-input">
        <TextField
          type="text"
          label="Alt"
          defaultValue={altDefaultValue}
          onChange={onChangeImageInput}
          style={{ marginBottom: '3rem' }}
          onClick={onClickImageInput}
        />
      </div>
    </div>
  );
}
