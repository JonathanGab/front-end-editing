import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import Image from '../image/Image';
import { drupal_module } from '../../config';
export default function GenericInputDrupal({
  type,
  itemAncetre,
  itemParent,
  itemKey,
  itemGrandParent,
  ...props
}) {
  switch (true) {
    case typeof type === 'string' &&
      itemAncetre !== 'included' &&
      // si les elements sont dans le tableau excluded, on ne les affiche pas

      !drupal_module.exclude_id_array.includes(itemGrandParent): {
      return <TextInput {...props} />;
    }
    case typeof type === 'number' &&
      !drupal_module.exclude_number_input.includes(itemGrandParent): {
      return <NumberInput {...props} />;
    }
    case typeof type === 'boolean' &&
      !drupal_module.exclude_boolean_input.includes(itemGrandParent): {
      return <SelectInput {...props} inputLabel={itemKey} />;
    }
    case drupal_module.include_image_field.includes(
      itemAncetre && itemParent && itemKey
    ): {
      return <Image {...props} />;
    }
    default: {
      return null;
    }
  }
}
//dCnJaW)^h&ifILeZLN
