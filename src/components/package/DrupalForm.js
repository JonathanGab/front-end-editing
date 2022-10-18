import React, { useState, useEffect } from 'react';
import { displayDataDrupal } from '../package/features/displayData';
import { fetchData } from '../package/features/fetchData';
import { removeHtmlTags } from '../package/features/removeHtmlTag';
import { uploadImageDrupal } from '../package/features/uploadImageDrupal';
import './Form.css';
import GenericInput from '../package/inputs/generic/GenericInputDrupal';
import ModalDrupal from './modal/ModalDrupal';

export default function DrupalForm(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchData(
      props.propsopen,
      props.id,
      props.setDataBeforeIterate,
      props.drupal_module_url_back
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.propsopen, props.id, props.navigation]);

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

  const handleOpen = () => {
    setIsOpen(!isOpen);
    props.setFormMediaValues({
      [props.chemin]: {
        ...props.formMediaValues,
        data: {
          type: 'file--file',
          id: props.mediaId,
          meta: {
            alt: props.alt,
            title: props.title,
          },
        },
      },
    });
  };

  useEffect(() => {
    uploadImageDrupal(
      props.uploadId,
      props.setMediaId,
      props.setFormMediaValues,
      props.mediaId,
      props.alt,
      props.title
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.uploadId.id, props.mediaId]);

  const handleInputsChange = (e, item) => {
    props.setFormValues(
      item?.parent === 'attributes'
        ? {
            ...props.formValues,
            ...props.formValues[item?.ancetre],
            [item?.key]: e.target.value,
          }
        : {
            ...props.formValues,
            ...props.formValues[item?.ancetre],
            [item?.parent]: e.target.value,
          }
    );
  };
  const changeIndex = (arr) => {
    const sortArray = arr.sort((a, b) =>
      a.ancetre > b.ancetre ? 1 : b.ancetre > a.ancetre ? -1 : 0
    );
    return sortArray;
  };

  return props.emptyArray ? (
    <form onSubmit={props.onPatchData} className="form-cms">
      {changeIndex(props.emptyArray)
        ?.filter(
          (element) =>
            (props.drupal_module_filter.includes(element?.ancetre) &&
              props.drupal_module_filter.includes(element?.key)) ||
            element?.ancetre.includes('field_')
        )
        ?.map((item, index) => (
          <GenericInput
            key={index}
            type={item?.content}
            itemAncetre={item?.ancetre}
            itemParent={item?.parent}
            itemKey={item?.key}
            rows={
              typeof item?.content === 'string' && item?.content.length > 37
                ? 5
                : 1
            }
            inputLabel={item?.key}
            src={`http://localhost${item?.content}`}
            label={item?.key}
            defaultValue={removeHtmlTags(item?.content)}
            name={item?.ancetre}
            onChange={(e) => handleInputsChange(e, item)}
            value={item?.content}
            // passe un props pour la recuperer dans le parent
            drupal_string_input={props.string_input_filter}
            drupal_number_input={props.drupal_module_exclude_number_array}
            drupal_boolean_input={props.drupal_boolean_input}
            drupal_image_field={props.drupal_image_field}
            updateImageOnclick={() => {
              setIsOpen(!isOpen);
              props.setChemin(item?.ancetre);
            }}
            textClick={() => console.log('textClick', item.key)}
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
      <ModalDrupal
        open={isOpen}
        route_to_media
        api_url
        onClick={handleOpen}
        setUploadId={props.setUploadId}
        mediaId={props.mediaId}
        setMediaId={props.setMediaId}
        setAlt={props.setAlt}
        setTitle={props.setTitle}
        title={props.title}
        alt={props.alt}
        chemin_url={props.chemin_url}
      />
    </form>
  ) : (
    <div>Loading...</div>
  );
}
