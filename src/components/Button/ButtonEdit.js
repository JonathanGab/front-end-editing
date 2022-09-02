import React from 'react';
import './ButtonEdit.css';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export default function ButtonEdit({ onClick }) {
  return (
    <button className="btn">
      <BorderColorOutlinedIcon onClick={onClick} />
    </button>
  );
}
