import React, { useContext } from 'react';
import Form from '../Form/Form';
import './Drawer.css';
import { DrawerContext } from '../../Contexts/DrawerContext';
import CloseIcon from '@mui/icons-material/Close';
export default function Drawer({
  background = '#fff',
  width = '30%',
  direction = 'column',
  formOne,
  formTwo,
}) {
  const { handleClose, open } = useContext(DrawerContext);

  return (
    <div className={open ? 'container' : 'container-close'}>
      <div className="box">
        <div
          className={open ? 'drawer-open' : 'drawer-close'}
          style={
            open
              ? {
                  backgroundColor: background,
                  width: width,
                }
              : {
                  width: 0,
                }
          }
        >
          <div>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="drawer-col" style={{ flexDirection: direction }}>
            {formOne}
            {formTwo}
          </div>
        </div>
      </div>
    </div>
  );
}
