import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { drupal_module } from '../../config';
import { JsonParserContext } from '../../Contexts/JsonParserContext';
import { DrawerContext } from '../../Contexts/DrawerContext';
import GenericInputDrupal from '../Inputs/GenericInputDrupal';
import './FormDrupal.css';
import ModalDrupal from '../modal/ModalDrupal';
export default function FormDrupal() {
  //. STATE

  // eslint-disable-next-line no-unused-vars
  const [drawerData, setDrawerData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [drawerImage, setDrawerImage] = useState([]);
  const [formMediaValues, setFormMediaValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadId, setUploadId] = useState('');
  const [mediaId, setMediaId] = useState('');
  //. CONTEXTS
  const { iterate, removeHtmlTags } = useContext(JsonParserContext);
  const { id, open, formValues, setFormValues, isPreview, setIsPreview } =
    useContext(DrawerContext);
  //. PARAMS
  const handleOpen = () => {
    setIsOpen(!isOpen);
    setFormMediaValues({
      field_image: {
        data: {
          type: 'file--file',
          id: mediaId,
          meta: {
            alt: 'test',
            title: 'test',
          },
        },
      },
    });
  };
  useEffect(() => {
    if (uploadId) {
      setMediaId(uploadId.id);
      setFormMediaValues({
        field_image: {
          data: {
            type: 'file--file',
            id: mediaId,
            meta: {
              alt: 'test',
              title: 'test',
            },
          },
        },
      });
    }
    return;
  }, [uploadId, mediaId]);
  //! ----------------------------------- fetchData -----------------------------------
  const displayData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/drupalSite/jsonapi/node/article/${id}?include=field_image`
      );
      // setDrawerData(response.data.data);
      setDrawerData(response.data);
      setDrawerImage(response.data.included);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open === false && id === null) {
      setDrawerData([]);
    } else {
      displayData();
    }
  }, [open]);
  //! ----------------------------------- displayData -----------------------------------
  useEffect(() => {
    if (drawerData !== null && drawerData !== undefined && id !== null) {
      iterate(drawerData, '', 'racine', 'gp', parsedData, setParsedData);
    } else if (id === null) {
      setParsedData([]);
    }
  }, [drawerData]);

  //. PATCH DATA
  const handleInputsChange = (e, item) => {
    setFormValues(
      item?.parent === 'attributes'
        ? {
            ...formValues,
            ...formValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...formValues,
            ...formValues[item?.ancetre],
            [item?.parent]: e.target.value,
          }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.patch(
        `http://localhost/drupalSite/jsonapi/node/article/${id}`,
        {
          data: {
            type: 'node--article',
            id: id,
            attributes: formValues,
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
  // ----------------------------------- CONSOLE.LOG -----------------------------------
  console.log(formValues);
  console.log(parsedData);
  // -------

  return parsedData ? (
    <div className="form-drupal-container">
      <form onSubmit={handleSubmit}>
        {parsedData
          ?.filter(
            (element) =>
              drupal_module.filter.includes(element?.ancetre) &&
              drupal_module.filter.includes(element?.key)
          )
          ?.map((item, index) => (
            <div>
              {/* <p onClick={() => console.log(item.grandParent)}>x</p> */}
              <GenericInputDrupal
                key={index}
                type={item?.content}
                itemAncetre={item?.ancetre}
                itemGrandParent={item?.grandParent}
                itemParent={item?.parent}
                itemKey={item?.key}
                src={`http://localhost${item?.content}`}
                label={item?.key}
                defaultValue={removeHtmlTags(item?.content)}
                name={item?.ancetre}
                onChange={(e) => handleInputsChange(e, item)}
                value={item?.content}
              />
            </div>
          ))}
        <div className="upload-drupal-media">
          <button
            className="button-drupal-media"
            type="button"
            onClick={handleOpen}
          >
            upload media
          </button>
        </div>
        <div className="btn-drupal-container">
          <button
            className="btn-drupal-send"
            type="button"
            onClick={() => {
              setIsPreview(!isPreview);
            }}
          >
            Preview
          </button>
          <button className="btn-drupal-send">send</button>
        </div>
      </form>
      <ModalDrupal
        open={isOpen}
        onClick={handleOpen}
        uploadId={uploadId}
        setUploadId={setUploadId}
        mediaId={mediaId}
        setMediaId={setMediaId}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
