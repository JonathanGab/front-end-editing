import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './SelectInput.css';

export default function SelectInput({ inputLabel, label, value, onChange }) {
  return (
    <div className="select-input-container">
      <FormControl style={{ width: 20 + '%' }}>
        <InputLabel id="select-label">{inputLabel}</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          <MenuItem value="true">true</MenuItem>
          <MenuItem value="false">false</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
