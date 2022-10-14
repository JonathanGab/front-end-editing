import React from 'react';
import Box from '@mui/material/Box';
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
    <Box className="select-input-container">
      <FormControl style={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-label" className="input-label">
          {inputLabel}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          <MenuItem value={true}>publish</MenuItem>
          <MenuItem value={false}>draft</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
