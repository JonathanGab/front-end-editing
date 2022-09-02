import React, { useContext } from 'react';
import Form from '../Form/Form';
import './Drawer.css';
import { DrawerContext } from '../../Contexts/DrawerContext';
export default function Drawer() {
  const { handleOpen, open } = useContext(DrawerContext);

  return (
    <div className={open ? 'container' : 'container-close'}>
      <div className="box">
        <div className={open ? `drawer open` : `drawer close`}>
          <div>
            <button onClick={handleOpen}>x</button>
          </div>
          <div className="drawer-col">
            <Form />

            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
