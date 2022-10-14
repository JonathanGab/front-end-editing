import React, { ChangeEvent } from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';

export default function TextInput(props) {
  return (
    <div className="input-container">
      <TextField
        type="text"
        // input props
        label={props.label}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        // for style of input
        rows={props.rows}
        multiline={true}
        disabled={props.label === 'id' ? true : false}
        onClick={props.textClick}
      />
    </div>
  );
}
