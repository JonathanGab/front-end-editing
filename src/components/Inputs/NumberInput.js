import React from 'react';
import './NumberInput.css';
import { TextField } from '@mui/material';
export default function NumberInput({
  name,
  onClick,
  onChange,
  defaultValue,
  label,
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
        type={'number'}
      />
    </div>
  );
}
