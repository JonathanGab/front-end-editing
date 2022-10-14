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
        type={'number'}
        id="outlined-basic"
        variant="outlined"
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        onClick={onClick}
        name={name}
        disabled={label === 'id' ? true : false}
        fullWidth
      />
    </div>
  );
}
