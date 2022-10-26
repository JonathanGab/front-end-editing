import React, { useContext, useEffect, useState } from 'react';
import { drupal_module } from '../../config';
import { DrawerContext } from '../../Contexts/DrawerContext';
import './Drawer.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function Drawer({
  open,
  onClick,
  formOne,
  drawer_title = 'Front end editing',
  background,
  width,
  width_mobile = 100 + '%',
  width_desktop = 50 + '%',
  column = true,
  paperColor = 'transparent',
  header_nav_background,
}) {
  const { setNavigation } = useContext(DrawerContext);
  const [isMobile, setIsMobile] = useState(false);

  function isMobileOrDesktop() {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useEffect(() => {
    window.addEventListener('resize', isMobileOrDesktop);
    return () => {
      window.removeEventListener('resize', isMobileOrDesktop);
    };
  }, [isMobile]);

  useEffect(() => {
    const drawer_list_item = document.querySelectorAll('.drawer-list-item');
    // first item is active by default
    drawer_list_item[0].classList.add('active');
    // add color to first item active
    drawer_list_item[0].style.backgroundColor = header_nav_background;
    // change color to active item
    drawer_list_item.forEach((item) => {
      item.addEventListener('click', () => {
        drawer_list_item.forEach((item) => {
          item.classList.remove('active');
          if (!item.classList.contains('active')) {
            item.style.backgroundColor = 'transparent';
          }
        });
        item.classList.add('active');
        if (item.classList.contains('active')) {
          item.style.backgroundColor = header_nav_background;
        }
      });
    });
  }, []);

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
                  width: isMobile ? width_mobile : width_desktop,
                }
              : {
                  width: 0,
                }
          }
        >
          <div className="drawer-header">
            <div className="drawer-navigation-header">
              <div>
                <button onClick={onClick}>
                  <ClearOutlinedIcon fontSize="large" />
                </button>
              </div>
              <div className="drawer-title">{drawer_title}</div>
            </div>
            <div className="drawer-nav-container">
              <div className="drawer-navigation">
                <ul className="drawer-nav-list">
                  {drupal_module.language_array.map((lang, index) => (
                    <li
                      onClick={() => setNavigation(lang === 'fr' ? '' : lang)}
                      key={index}
                      className="drawer-list-item"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
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
