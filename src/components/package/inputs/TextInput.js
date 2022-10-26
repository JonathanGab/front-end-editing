import React, { ChangeEvent } from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';

export default function TextInput(props) {
  return (
    <div className="input-container">
      <TextField
        type="text"
        // input props
        name={props.nameTextInput}
        label={props.label}
        defaultValue={props.defaultValue}
        onChange={props.onChangeTextInput}
        onClick={props.textClick}
        // for style of input
        rows={props.rows}
        multiline={true}
        disabled={props.label === 'id' ? true : false}
        error={props.error === null ? true : false}
      />
    </div>
  );
}
