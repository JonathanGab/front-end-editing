import React, { useContext, useState } from 'react';
import { drupal_module } from '../../config';
import { DrawerContext } from '../../Contexts/DrawerContext';
import './Drawer.css';

export default function Drawer({
  open,
  onClick,
  formOne,

  background,
  width = 50 + '%',
  column = true,
  paperColor = 'transparent',
}) {
  const { navigation, setNavigation } = useContext(DrawerContext);
  return (
    <div className={open ? 'container' : 'container-close'}>
      <div className="box" style={{ backgroundColor: paperColor }}>
        <div
          className={open ? `drawer-open` : `drawer-close`}
          // CUSTOMIZABLE CSS
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
            <button onClick={onClick}>x</button>
          </div>
          <div className="drawer-nav-container">
            <div className="drawer-navigation">
              <ul className="drawer-nav-list">
                {drupal_module.language_array.map((lang) => (
                  <li onClick={() => setNavigation(lang === 'fr' ? '' : lang)}>
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="drawer-col"
            // CUSTOMIZABLE CSS
            style={
              column === true
                ? {
                    flexDirection: 'column',
                  }
                : {
                    flexDirection: 'row',
                  }
            }
          >
            {formOne}
          </div>
        </div>
      </div>
    </div>
  );
}
