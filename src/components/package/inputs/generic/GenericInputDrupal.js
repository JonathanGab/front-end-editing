import React from 'react';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import SelectInput from '../SelectInput';
import Image from '../Image';

export default function GenericInput({
  type,
  itemAncetre,
  itemChemin,
  itemGrandParent,
  itemParent,
  itemKey,
  drupal_string_input,
  drupal_number_input,
  drupal_boolean_input,
  drupal_image_field,
  ...props
}) {
  switch (true) {
    case typeof type === 'string' &&
      itemAncetre !== 'included' &&
      !drupal_string_input.includes(itemKey): {
      return <TextInput {...props} />;
    }
    case typeof type === 'number' &&
      !drupal_number_input.includes(itemParent): {
      return <NumberInput {...props} />;
    }
    case typeof type === 'boolean' &&
      drupal_boolean_input.includes(itemGrandParent): {
      return <SelectInput {...props} />;
    }
    case itemAncetre !== 'included' &&
      drupal_image_field.includes(itemAncetre): {
      return <Image {...props} />;
    }
    default: {
      // return <Image {...props} />;
      return <></>;
    }
  }
}
