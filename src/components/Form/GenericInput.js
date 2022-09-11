import React from 'react';
import TextInput from '../Inputs/TextInput';
import NumberInput from '../Inputs/NumberInput';
import SelectInput from '../Inputs/SelectInput';

function GenericInput({ content, itemKey, ...props }) {
  const getInput = () => {
    switch (content) {
      case typeof content === 'string': {
        return <TextInput {...props} />;
      }
      case typeof content === 'number': {
        return <NumberInput {...props} />;
      }
      case typeof content === 'boolean': {
        return <SelectInput {...props} value={content} inputLabel={itemKey} />;
      }
      default: {
        return <></>;
      }
    }
  };
  return <div className="input-margin">{getInput()}</div>;
}

export default GenericInput;
