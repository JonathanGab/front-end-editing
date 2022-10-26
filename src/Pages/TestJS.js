import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/package/Button';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { drupal_module } from '../config';
import Drawer from '../components/package/Drawer';
import DrupalForm from '../components/package/DrupalForm';
import bcrypt from 'bcryptjs';
export default function TestJS() {
  const [getData, setGetData] = useState([]);
  const [edit, setEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  const {
    setId,
    handleOpen,
    id,
    isPreview,
    open,
    handlePreview,
    CloseDrawer,
    navigation,
    userData,
  } = useContext(DrawerContext);
  const { removeHtmlTags } = useContext(JsonParserContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost/drupalSite/jsonapi/node/article`)
      .then((response) => {
        setGetData(response?.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //  ------------------------------ CONSOLE LOG ------------------------------
  // console.log('userData.email', userData?.email);
  // console.log('userData.password', userData?.password);

  // --------------------------------------------------------------------------
  if (isLoading) {
    return 'loading....';
  }
  return (
    <div>
      {getData?.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid black',
          }}
        >
          {isPreview && <p className="">preview mode</p>}
          <h1>
            {isPreview && item?.id === id
              ? edit?.title
              : item?.attributes?.title}
          </h1>
          <p>
            {isPreview && item?.id === id
              ? edit?.body
              : removeHtmlTags(item?.attributes?.body?.value)}
          </p>
          <p>{isPreview && item?.id === id ? edit?.body : item?.id}</p>

          <Button
            //?
            position="relative"
            top={1}
            right={0}
            color={'#000'}
            //!
            onClick={() => {
              setId(item.id);
              handleOpen();
            }}
          />
        </div>
      ))}

      <Drawer
        open={open}
        onClick={() => {
          //!
          CloseDrawer();
          setId(null);
          setArray([]);
          setImageArray([]);
        }}
        //. -------------------------------- DRAWER STYLE --------------------------------

        width_desktop={drupal_module.style.drawer_width_desktop}
        paperColor={drupal_module.style.paper_color}
        drawer_title={drupal_module.drawer_title}
        header_nav_background={drupal_module.style.drawer_header_background}
        //. ------------------------------------------------------------------------------
        formOne={
          <DrupalForm //!
            emptyArray={array}
            dataBeforeIterate={filteredValue}
            id={id}
            dataAfterIterate={array}
            seDataAfterIterate={setArray}
            setDataBeforeIterate={setFilteredValue}
            user={userData?.email}
            user_mdp={userData?.password}
            drupal_base_url={drupal_module.website_base_url}
            drupal_module_url_back={
              navigation === ''
                ? `http://localhost/drupalSite/jsonapi/node/article/${id}?include=field_background,field_image,field_image_3,field_image_4`
                : `http://localhost/drupalSite/${navigation}/jsonapi/node/article/${id}?include=field_background,field_image,field_image_3,field_image_4`
            }
            drupal_module_filter={drupal_module.filter}
            string_input_filter={drupal_module.string_input_filter}
            drupal_module_exclude_number_array={
              drupal_module.exclude_number_input
            }
            drupal_boolean_input={drupal_module.exclude_boolean_input}
            onClickPreview={handlePreview}
            navigation={navigation}
            imageArray={imageArray}
          />
        }
      />
    </div>
  );
}
