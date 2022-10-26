import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer, DrupalForm } from 'jonathan-formulaire';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { drupal_module } from '../config';

// TODO : gestion traduction
// TODO : Authentification
// TODO : DOC!

export default function ArticlePackageDrup() {
  const [getData, setGetData] = useState([]);
  const [edit, setEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [navigation, setNavigation] = useState('');
  const {
    setId,
    handleOpen,
    id,
    getId,
    isPreview,
    open,
    handlePreview,

    CloseDrawer,
  } = useContext(DrawerContext);
  const { removeHtmlTags } = useContext(JsonParserContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost/drupalSite/jsonapi/node/article
        `
      )
      .then((response) => {
        setGetData(response?.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {isPreview && <p className="">preview mode</p>}
      {getData?.map((item) => (
        <>
          <h1>
            {isPreview && item?.id === getId
              ? edit?.title
              : item?.attributes?.title}
          </h1>
          <p>
            {isPreview && item?.id === getId
              ? edit?.body
              : removeHtmlTags(item?.attributes?.body?.value)}
          </p>
          <div style={{ position: 'relative' }}>
            <Button
              position={'absolute'}
              top={16}
              right={32}
              color={'#000'}
              onClick={() => {
                setId(item.id);
                handleOpen();
              }}
            />
          </div>
        </>
      ))}
      <Drawer
        open={open}
        closeModalOnClick={() => {
          CloseDrawer();
          setId(null);
          setArray([]);
          setImageArray([]);
        }}
        width_desktop={drupal_module.style.drawer_width_desktop}
        paperColor={drupal_module.style.paper_color}
        drupal_module_language_array={drupal_module.language_array}
        drawer_title={drupal_module.drawer_title}
        setNavigation={setNavigation}
        header_nav_background={drupal_module.style.drawer_header_background}
        formOne={
          <DrupalForm
            emptyArray={array}
            user={drupal_module.user}
            user_mdp={drupal_module.user_mdp}
            drupal_base_url={drupal_module.website_base_url}
            //. iterate function() start
            dataBeforeIterateFunc={filteredValue}
            formId={id}
            dataAfterIterateFunc={array}
            seDataAfterIterateFunc={setArray}
            //. iterate function() end
            //. fetchdata() start
            openForm={open}
            setDataBeforeIterateFunc={setFilteredValue}
            //. uploadImage() start
            //. displayData end
            drupal_module_url_back={
              navigation === ''
                ? `http://localhost/drupalSite/jsonapi/node/article/${id}?include=field_background,field_image,field_image_3,field_image_4`
                : `http://localhost/drupalSite/${navigation}/jsonapi/node/article/${id}?include=field_background,field_image,field_image_3,field_image_4`
            }
            drupal_module_filter={drupal_module.filter}
            drupal_string_input={drupal_module.string_input_filter}
            drupal_number_input={drupal_module.exclude_number_input}
            drupal_boolean_input={drupal_module.exclude_boolean_input}
            //. props for modal
            media_url={'http://localhost/drupalSite/jsonapi/file/file'}
            api_url={drupal_module.url_website_back}
            onClickIsPreview={handlePreview}
            image_array={imageArray}
            navigation={navigation}
          />
        }
      />
    </div>
  );
}
