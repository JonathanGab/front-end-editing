import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

import './Input.css';

export default function NumberInput(props) {
  return (
    <div className="input-container">
      <TextField
        id="outlined-basic"
        type="number"
        variant="outlined"
        // input props
        label={props.label}
        defaultValue={Number(props.defaultValue)}
        onChange={props.onChange}
        disabled={props.label === 'id' ? true : false}
        rows={props.rows}
        onClick={props.onNumberClick}
      />
    </div>
  );
}
