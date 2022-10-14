import React from 'react';
import TextInput from '../Inputs/TextInput';
import NumberInput from '../Inputs/NumberInput';
import SelectInput from '../Inputs/SelectInput';
import Image from '../image/Image';
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
      return (
        <SelectInput {...props} /*value={content}*/ inputLabel={itemKey} />
      );
    }
    case itemAncetre === 'better_featured_image' &&
      itemParent === 'better_featured_image' &&
      itemKey === 'source_url': {
      return <Image {...props} />;
    }
    default: {
      return null;
    }
  }
}
