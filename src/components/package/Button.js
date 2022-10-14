import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export const Button = ({
  onClick,
  color,
  position = 'absolute',
  top = 0,
  right = '20px',
}) => {
  return (
    <div
      style={{
        color: color,
        position: position,
        top: top,
        right: right,
      }}
    >
      <BorderColorOutlinedIcon onClick={onClick} />
    </div>
  );
};
export default Button;
