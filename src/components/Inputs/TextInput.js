import React from 'react';
import './TextInput.css';
import TextField from '@mui/material/TextField';

export default function TextInput({
  label,
  defaultValue,
  onChange,
  name,
  onClick,
  inputLabel,
}) {
  return (
    <div className="input-container">
      <label className="input-label">{inputLabel}</label>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        defaultValue={defaultValue}
        onChange={onChange}
        onClick={onClick}
        name={name}
      />
    </div>
  );
}
