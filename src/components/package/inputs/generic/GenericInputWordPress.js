import React from 'react';
import TextInput from '../TextInput';
import NumberInput from '../NumberInput';
import SelectInput from '../SelectInput';
import Image from '../Image';

export default function GenericInputWordPress({
  type,
  itemAncetre,
  itemParent,
  itemKey,
  ...props
}) {
  switch (true) {
    case typeof type === 'string' && itemAncetre !== 'better_featured_image': {
      return <TextInput {...props} />;
    }
    case typeof type === 'number': {
      return <NumberInput {...props} />;
    }
    case typeof type === 'boolean': {
      return <SelectInput {...props} />;
    }
    case itemAncetre === 'better_featured_image' &&
      itemParent === 'better_featured_image' &&
      itemKey === 'source_url': {
      return <Image {...props} />;
    }
    default: {
      return <></>;
    }
  }
}
