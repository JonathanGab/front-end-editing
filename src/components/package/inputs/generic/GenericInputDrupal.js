import React from 'react';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import SelectInput from '../SelectInput';
import Image from '../Image';

export default function GenericInput({
  type,
  itemAncetre,
  itemGrandParent,
  itemParent,
  itemKey,
  itemIsImage,
  drupal_string_input,
  drupal_number_input,
  drupal_boolean_input,
  ...props
}) {
  switch (true) {
    case (typeof type === 'string' || type === null) &&
      itemAncetre !== 'included' &&
      drupal_string_input.includes(itemKey) &&
      itemParent !== 'meta': {
      return <TextInput {...props} />;
    }
    case typeof type === 'number' &&
      !drupal_number_input.includes(itemParent) &&
      itemKey === 'meta': {
      return <NumberInput {...props} />;
    }
    case typeof type === 'boolean' &&
      drupal_boolean_input.includes(itemGrandParent): {
      return <SelectInput {...props} />;
    }
    case itemIsImage: {
      return <Image {...props} />;
    }
    default: {
      return <></>;
    }
  }
}
