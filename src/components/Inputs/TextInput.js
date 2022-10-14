import React from 'react';
import './TextInput.css';
import TextField from '@mui/material/TextField';

export default function TextInput({
  label,
  defaultValue,
  onChange,
  name,
  onClick,
}) {
  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        rows={defaultValue.length >= 37 ? 5 : 1}
        multiline
        fullWidth
        disabled={label === 'id' ? true : false}
      />
    </div>
  );
}
