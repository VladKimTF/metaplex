import React, { memo, ReactElement } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';

import { ArtContent } from '../../../../components/ArtContent';
import { ItemRowProps } from './interface';

const ItemRow = ({
  item,
  isSelected,
  onClick,
  onInputChange,
  inputValue,
}: ItemRowProps): ReactElement => {
  const { metadata, masterEdition } = item;
  const { pubkey } = metadata;
  const { name, uri } = metadata?.info?.data;

  const maximumSupply = masterEdition?.info.maxSupply?.toNumber() || 0;

  const itemRowCls = classNames({
    'pack-item-row': true,
    'pack-item-row--selected': isSelected,
  });

  return (
    <div className={itemRowCls} onClick={onClick}>
      {onInputChange && (
        <div className="input-column">
          <Input
            type="number"
            min={0}
            value={inputValue}
            onChange={({ target: { value } }) => onInputChange(value)}
          />
        </div>
      )}
      <div className="preview-column">
        <ArtContent pubkey={pubkey} uri={uri} preview={false} />
      </div>
      <div className="name-column">
        <p className="name-column__name">{name}</p>
        <p className="name-column__subtitle">Master</p>
      </div>
      <div className="info-column">
        <p className="info-column__subtitle">Maximum Supply</p>
        <p className="info-column__value">{maximumSupply}</p>
      </div>
    </div>
  );
};

export default memo(ItemRow);
