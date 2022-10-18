import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer, DrupalForm } from 'jonathan-formulaire';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { drupal_module } from '../config';

// Gerer multiple chanmps image
// Gerer l'authentification de drupal

export default function ArticlePackageDrup() {
  const [getData, setGetData] = useState([]);
  const [edit, setEdit] = useState({});
  const [uploadId, setUploadId] = useState();
  const [mediaId, setMediaId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [chemin, setChemin] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const [navigation, setNavigation] = useState('');
  const {
    setId,
    handleOpen,
    id,
    getId,
    setGetId,
    isPreview,
    open,
    handlePreview,
    setFormMediaValues,
    formMediaValues,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `http://localhost/drupalSite/jsonapi/node/article/${id}`,
        {
          data: {
            type: 'node--article',
            id: id,
            attributes: edit,
            relationships: formMediaValues,
          },
        },
        {
          headers: {
            Authorization: 'Basic ' + window.btoa(`apiuser:Vavaskale69!`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
    } catch (err) {
      console.error({ message: err });
    } finally {
      setMediaId('');
      setUploadId('');
    }
  };

  console.log('nav', navigation);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {isPreview && <p className="">preview mode</p>}
      {getData?.map((item) => (
        <>
          <h1 onClick={() => console.log(item.id)}>
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
                setGetId(item.id);
                setId(`${item.id}`);
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
        width={drupal_module.style.drawer_width}
        language_array={drupal_module.language_array}
        setNavigation={setNavigation}
        formOne={
          <DrupalForm
            emptyArray={array}
            editFormValues={edit}
            setEditFormValues={setEdit}
            //. ---------------------------------
            onPatchData={handleSubmit}
            ancetre={array.ancetre}
            chemin={chemin}
            setChemin={setChemin}
            parent={array.parent}
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
            drupal_string_input={drupal_module.exclude_id_array}
            drupal_number_input={drupal_module.exclude_number_input}
            drupal_boolean_input={drupal_module.exclude_boolean_input}
            //. props for modal
            media_url={'http://localhost/drupalSite/jsonapi/file/file'}
            api_url={drupal_module.url_website_back}
            setMediaId={setMediaId}
            mediaId={mediaId}
            setDragAndDropUploadId={setUploadId}
            dragAndDropUploadId={uploadId}
            setEditFormMedia={setFormMediaValues}
            onClickIsPreview={handlePreview}
            chemin_url={chemin}
            image_array={imageArray}
            navigation={navigation}
          />
        }
      />
    </div>
  );
}
