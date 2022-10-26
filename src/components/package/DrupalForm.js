import React, { useState, useEffect, useCallback } from 'react';
import { displayDataDrupal } from '../package/features/displayData';
import { fetchData } from '../package/features/fetchData';
import { removeHtmlTags } from '../package/features/removeHtmlTag';
import { uploadImageDrupal } from '../package/features/uploadImageDrupal';
import './Form.css';
import GenericInput from '../package/inputs/generic/GenericInputDrupal';
import ModalDrupal from './modal/ModalDrupal';
import axios from 'axios';

// ERROR: (FORMAT ERROR) PUSHER une image dans la médiathèque / tri des images par mot clé
// TODO : si la trad n'est pas active
// TODO : detecter les problèmes de paramètres de configuration (auth/trad)
// TODO : créer un article a la connexion et stocker l'id et le supprimer lorsqu'on se déconnecte
// DONE : renvoyer le champ vide avec un border rouge
export default function DrupalForm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [getRoute, setGetRoute] = useState(null);
  const [getImage, setGetImage] = useState('');
  const [storageArray, setStorageArray] = useState([]);
  const [chemin, setChemin] = useState('');
  const [uploadId, setUploadId] = useState('');
  const [mediaId, setMediaId] = useState('');
  const [formValues, setFormValues] = useState({});
  const [editFormMedia, setEditFormMedia] = useState({});

  //? --------------------------- USE EFFECT ---------------------------
  useEffect(() => {
    fetchData(
      isOpen,
      props.id,
      props.setDataBeforeIterate,
      props.drupal_module_url_back
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, props.id, props.navigation]);

  useEffect(() => {
    displayDataDrupal(
      props.dataBeforeIterate,
      props.id,
      props.dataAfterIterate,
      props.seDataAfterIterate,
      props.imageArray
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataBeforeIterate]);

  useEffect(() => {
    uploadImageDrupal(chemin, uploadId, setMediaId, setEditFormMedia, mediaId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadId, mediaId]);

  useEffect(() => {
    if (getImage !== '') {
      updateArrayImage(getRoute, getImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getImage]);
  // --------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(
        props.navigation === ''
          ? `${props.drupal_base_url}/jsonapi/node/article/${props.id}`
          : `${props.drupal_base_url}/${props.navigation}/jsonapi/node/article/${props.id}`,
        {
          data: {
            type: 'node--article',
            id: props.id,
            attributes: formValues,
            relationships: editFormMedia,
          },
        },
        {
          headers: {
            Authorization:
              'Basic ' + window.btoa(`${props.user}:${props.user_mdp}`),
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

  //? --------------------------- EDIT DATA ---------------------------

  const handleImageChange = (e) => {
    setEditFormMedia({
      ...editFormMedia,
      [chemin]: {
        data: {
          type: 'file--file',
          id: mediaId || storeId,
          meta: {
            alt: e?.target?.value,
            title: e?.target?.value,
          },
        },
      },
    });
  };

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
  // ---------------------------  ---------------------------
  const changeIndex = (arr) => {
    const sortArray = arr.sort((a, b) =>
      a.ancetre > b.ancetre ? 1 : b.ancetre > a.ancetre ? -1 : 0
    );
    return sortArray;
  };
  //? --------------------------- UPDATE ARRAY IMAGE ---------------------------
  const displayOnEdit = (array, itemAncetre, itemContent) => {
    let result = array.find((obj) => obj.route === itemAncetre);

    return result?.url
      ? `http://localhost${result?.url}`
      : `http://localhost${itemContent}`;
  };

  // ------------------------- NEW FEATURE -------------------------

  const updateArrayImage = (route, image) => {
    let temporaryObj = {
      route,
      ...image.attributes.uri,
    };
    // if storage.route is equal to route remplace object
    if (storageArray.find((obj) => obj.route === route)) {
      return setStorageArray(
        storageArray.map((obj) => (obj.route === route ? temporaryObj : obj))
      );
    } else {
      //  else add object
      return setStorageArray((prevState) => [...prevState, temporaryObj]);
    }
  };
  const checkLanguage = (emptyArray) => {
    if (emptyArray === props.navigation) {
      return;
    } else if (props.navigation === '') {
      emptyArray = 'fr';
      return;
    } else {
      return "Veuillez verifier la configuration de la langue dans votre back office Drupal. La langue à été activée sur le site mais pas sur l'article";
    }
  };
  // ----------------------- CONSOLE LOG -----------------------
  // console.log(formValues);
  // -----------------------------------------------------------

  return props.emptyArray ? (
    <form onSubmit={(e) => handleSubmit(e)} className="form-cms">
      {/* display the validation message */}
      <div className="error_message">
        {props.emptyArray[5]?.key === 'langcode' &&
          checkLanguage(props.emptyArray[5]?.content)}
      </div>
      {/* //? ---------------------------------- GENERIQUE INPUT ---------------------------------- */}
      {changeIndex(props.emptyArray).map((item, index) => (
        <GenericInput
          key={index}
          type={item?.content}
          itemAncetre={item?.ancetre}
          itemParent={item?.parent}
          itemIsImage={item?.isImage}
          itemKey={item?.key}
          textClick={() => console.log(typeof item?.content)}
          error={item?.content}
          //. --------------------------------------- INPUT TEXT COMPONENT ---------------------------------------
          rows={
            typeof item?.content === 'string' && item?.content.length > 37
              ? 5
              : 1
          }
          inputLabel={item?.key}
          defaultValue={removeHtmlTags(item?.content)}
          onChangeTextInput={(e) => {
            handleInputsChange(e, item);
          }}
          value={item?.content}
          //. --------------------------------------- FILTER CONFIG ---------------------------------------
          drupal_string_input={props.string_input_filter}
          drupal_number_input={props.drupal_module_exclude_number_array}
          drupal_boolean_input={props.drupal_boolean_input}
          //. --------------------------------------- IMAGE COMPONENT ---------------------------------------

          src={
            //! ADD TS
            displayOnEdit(storageArray, item.ancetre, item?.content)
          }
          label={
            item?.parent === 'attributes'
              ? item?.key
              : `${item?.parent} - ${item?.key}`
          }
          altDefaultValue={item?.alt}
          //! EDIT ON TS
          imagePosition={`image ${item?.ancetre}`}
          updateImageOnclick={() => {
            setIsOpen(!isOpen);
            setGetRoute(item?.ancetre);
            setChemin(item?.ancetre);
          }}
          //! ADD TS FOR IMAGE
          onClickImageInput={() => {
            setChemin(item?.ancetre);
            setStoreId(item?.parent);
          }}
          onChangeImageInput={(e) => {
            handleImageChange(e);
          }}
        />
      ))}

      <div className="btn-container">
        <button
          className="btn-send"
          type="button"
          onClick={props.onClickPreview}
        >
          Preview
        </button>
        <button className="btn-send">send</button>
      </div>
      {/* //? ---------------------------------- MODAL DRUPAL ---------------------------------- */}
      <ModalDrupal
        open={isOpen}
        route_to_media
        api_url
        onClose={() => {
          setIsOpen(false);
          setGetRoute(null);
        }}
        onClick={(e) => {
          handleImageChange(e);
          setIsOpen(!isOpen);
        }}
        setUploadId={setUploadId}
        mediaId={mediaId}
        setMediaId={setMediaId}
        chemin_url={chemin}
        setGetImage={setGetImage}
        getImage={getImage}
      />
    </form>
  ) : (
    <div>Loading...</div>
  );
}
