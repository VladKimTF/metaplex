import React, { memo, ReactElement, useMemo } from 'react';

import { useUserArts } from '../../../../hooks';

import ItemRow from './components/ItemRow';

import { SelectItemsStepProps } from './interface';
import { artistFilter, isSelected } from './utils';

const SelectItemsStep = ({
  handleSelectItem,
  selectedItems,
}: SelectItemsStepProps): ReactElement => {
  const items = useUserArts();
  const listedItems = useMemo(() => items.filter(artistFilter), [items]);

  return (
    <div style={{ padding: '20px 0' }}>
      {listedItems.map(item => (
        <ItemRow
          key={item.metadata.pubkey}
          isSelected={isSelected({
            selectedItems,
            pubkey: item.metadata.pubkey,
          })}
          onClick={() => handleSelectItem(item)}
          item={item}
        />
      ))}
    </div>
  );
};

export default memo(SelectItemsStep);
