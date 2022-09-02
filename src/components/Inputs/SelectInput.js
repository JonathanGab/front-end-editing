import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './SelectInput.css';
export default function SelectInput({
  inputLabel,
  label,
  value,
  onChange,
  displayValue,
}) {
  return (
    <div className="select-input-container">
      <div className="select-input-box">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={onChange}
          >
            <MenuItem value="true">true</MenuItem>
            <MenuItem value="false">false</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
