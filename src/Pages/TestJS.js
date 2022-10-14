import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/package/Button';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { drupal_module } from '../config';
import Drawer from '../components/package/Drawer';
import DrupalForm from '../components/package/DrupalForm';
export default function TestJS() {
  const [getData, setGetData] = useState([]);
  const [edit, setEdit] = useState({});
  const [uploadId, setUploadId] = useState();
  const [mediaId, setMediaId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [filteredValue, setFilteredValue] = useState([]);
  const [chemin, setChemin] = useState();
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const {
    setId,
    handleOpen,
    id,
    getId,
    isPreview,
    open,
    handlePreview,
    formMediaValues,
    CloseDrawer,
    setFormMediaValues,
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

  console.log('fmv', formMediaValues);
  console.log(chemin);
  if (isLoading) {
    return 'loading....';
  }
  return (
    <div>
      {getData?.map((item) => (
        <>
          {isPreview && <p className="">preview mode</p>}
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
          <p>{isPreview && item?.id === getId ? edit?.body : item?.id}</p>
          <Button
            position="relative"
            top={1}
            right={0}
            color={'#000'}
            onClick={() => {
              setId(`${item.id}`);
              handleOpen();
            }}
          />
        </>
      ))}

      <Drawer
        open={open}
        onClick={CloseDrawer}
        width={drupal_module.style.drawer_width}
        formOne={
          <DrupalForm
            emptyArray={array}
            formValues={edit}
            setFormValues={setEdit}
            //. ---------------------------------
            onPatchData={handleSubmit}
            chemin={chemin}
            setChemin={setChemin}
            ancetre={array.ancetre}
            parent={array.parent}
            getAncetre={chemin}
            //. ----------------------------------
            dataBeforeIterate={filteredValue}
            id={id}
            dataAfterIterate={array}
            seDataAfterIterate={setArray}
            //. -----------------------------------

            propsopen={open}
            setDataBeforeIterate={setFilteredValue}
            drupal_module_url_back={`http://localhost/drupalSite/jsonapi/node/article/${id}?include=field_background,field_image`}
            //. uploadImage() start
            //. displayData

            //. displayData end
            drupal_module_filter={drupal_module.filter}
            drupal_module_exclude_id_array={drupal_module.exclude_id_array}
            drupal_module_exclude_number_array={
              drupal_module.exclude_number_input
            }
            drupal_boolean_input={drupal_module.exclude_boolean_input}
            drupal_image_field={drupal_module.include_image_field}
            onClickPreview={handlePreview}
            mediaId={mediaId}
            setMediaId={setMediaId}
            setUploadId={setUploadId}
            uploadId={uploadId}
            setFormMediaValues={setFormMediaValues}
            field={array?.ancetre}
            setAlt={setAlt}
            setTitle={setTitle}
            title={title}
            alt={alt}
          />
        }
      />
    </div>
  );
}
