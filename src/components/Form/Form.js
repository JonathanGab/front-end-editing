import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { wordpress_module } from '../../config';
import { DrawerContext } from '../../Contexts/DrawerContext';
import { JsonParserContext } from '../../Contexts/JsonParserContext';
import GenericInputWordPress from '../Inputs/GenericInputWordPress';
import Modal from '../modal/Modal';
import './Form.css';

export default function Form({ lang }) {
  //. ----------------------------------- STATE -----------------------------------

  const [drawerData, setDrawerData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  // const [formValues, setFormValues] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadId, setUploadId] = useState('');
  const [mediaId, setMediaId] = useState('');
  //.  ----------------------------------- CONTEXTS -----------------------------------

  const { removeHtmlTags, iterate } = useContext(JsonParserContext);
  const { open, id, setIsPreview, isPreview, formValues, setFormValues } =
    useContext(DrawerContext);
  //.  ----------------------------------- PARAMS -----------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `${wordpress_module.url_website_back}${id}`,
        formValues,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setMediaId('');
      setUploadId('');
    }
  };
  //! ----------------------------------- fetchData -----------------------------------
  useEffect(() => {
    if (open === false && id === null) {
      setDrawerData([]);
    } else {
      axios
        // .get(`http://localhost/drupalSite/jsonapi/node/article/${id}`)
        .get(`${wordpress_module.url_website_back}${id}`)
        // .then((response) => setDrawerData(response.data.data))
        .then((response) => setDrawerData(response.data))
        .catch((err) => console.error(err));
    }
  }, [open]);
  //! ----------------------------------- displayData -----------------------------------
  useEffect(() => {
    if (drawerData !== null && drawerData !== undefined && id !== null) {
      iterate(drawerData, '', 'racine', parsedData, setParsedData);
    } else if (id === null) {
      setParsedData([]);
    }
  }, [drawerData]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setFormValues({ ...formValues, featured_media: mediaId });
  };

  useEffect(() => {
    if (uploadId) {
      setMediaId(uploadId.id);
      setFormValues({ ...formValues, featured_media: mediaId });
    }
    return;
  }, [uploadId, mediaId]);
  // ----------------------------------- CONSOLE.LOG -----------------------------------

  // ----------------------------------- RETURN -----------------------------------
  const handleInputsChange = (e, item) => {
    setFormValues({
      ...formValues,
      [item.ancetre]:
        item?.ancetre === wordpress_module.custom_fields
          ? { ...formValues[item.ancetre], [item?.key]: e.target.value }
          : e.target.value,
      status: wordpress_module.draft,
    });
  };
  console.log(formValues);
  return parsedData ? (
    <div className="form-container">
      {lang}
      <form onSubmit={handleSubmit} className="form">
        {parsedData
          ?.filter(
            (element) =>
              wordpress_module.filter.includes(element?.ancetre) &&
              wordpress_module.filter.includes(element?.key)
          )
          ?.map((item, index) => (
            <GenericInputWordPress
              key={index}
              type={item?.content}
              itemAncetre={item?.ancetre}
              itemParent={item?.parent}
              itemKey={item?.key}
              src={item?.content}
              defaultValue={removeHtmlTags(item?.content)}
              label={item.key === 'rendered' ? item?.ancetre : item?.key}
              name={item?.ancetre}
              onChange={(e) => {
                handleInputsChange(e, item);
              }}
            />
          ))}
        <div className="upload-media">
          <button className="button-media" type="button" onClick={handleOpen}>
            upload media
          </button>
        </div>
        <div className="btn-container">
          <button
            className="btn-send"
            type="button"
            onClick={() => {
              setIsPreview(!isPreview);
            }}
          >
            Preview
          </button>
          <button className="btn-send">send</button>
        </div>
      </form>
      {/* <Modal
        open={isOpen}
        onClick={handleOpen}
        uploadId={uploadId}
        setUploadId={setUploadId}
        mediaId={mediaId}
        setMediaId={setMediaId}
      /> */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
