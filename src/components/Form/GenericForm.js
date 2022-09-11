import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParsedData } from '../../hooks/useParsedData';
import { DrawerContext } from '../../Contexts/DrawerContext';
import { wordpress_module } from '../../config';
import GenericInput from './GenericInput';
import { JsonParserContext } from '../../Contexts/JsonParserContext';

function GenericForm({
  value,
  defaultValue,
  drawerURI,
  onSubmit,
  mapResponseFn,
}) {
  const [formValues, setFormValues] = useState(defaultValue);
  const { open, id } = useContext(DrawerContext);
  const enabled = open && id;
  const { parsedData, loading } = useParsedData({
    enabled,
    drawerURI,
    mapResponseFn,
  });
  const { removeHtmlTags } = useContext(JsonParserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formValues);
  };

  const handleInputChagne = (e, item) => {
    setFormValues({
      ...formValues,
      [item.ancetre]:
        item?.ancetre === 'acf'
          ? { [item?.key]: e.target.value }
          : e.target.value,
      status: 'draft',
    });
  };

  // Update form state if value prop changed
  useEffect(() => {
    setFormValues(value);
  }, [value, setFormValues]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {parsedData
          .filter(
            (element) =>
              wordpress_module.filter.includes(element?.ancetre) &&
              wordpress_module.filter.includes(element?.key)
          )
          .map((item, index) => (
            <GenericInput
              key={index}
              content={item.content}
              defaultValue={removeHtmlTags(item?.content)}
              label={item.key === 'rendered' ? item?.ancetre : item?.key}
              name={item?.ancetre}
              onChange={(e) => {
                handleInputChagne(e, item);
              }}
              itemKey={item.key}
            />
          ))}
      </form>
    </div>
  );
}

GenericForm.propTypes = {
  /** Controlled form value*/
  value: PropTypes.object,
  /** Default value for form */
  defaultValue: PropTypes.object,
  /** Callback after clicking on submit button */
  onSubmit: PropTypes.func,
  /** Drawer data api endpoint */
  drawerURI: PropTypes.string,
  /** Callback to change drawer response*/
  mapResponseFn: PropTypes.func,
};
export default GenericForm;
