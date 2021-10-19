import React, { memo, ReactElement } from 'react';
import { Typography } from 'antd';
import { ArtContent } from '../../../../../../components/ArtContent';

import { ItemProps } from './interface';
import { ItemType } from './types';

const { Text, Title } = Typography;

const Item = ({ item, type, cardsCount }: ItemProps): ReactElement => {
  const id = item.metadata.pubkey;
  const { name, uri } = item.metadata?.info?.data;
  const cardCounts = type === ItemType.Card ? cardsCount.find(card => card[id])[id] : null;

  return (
    <div className="item-wrapper">
      <div className="item-info">
        <Title level={5}>Name: {name}</Title>
        {cardCounts && (
          <>
            <Text>Count: {cardCounts?.count || 0}</Text>
            <Text>MaxSupply: {cardCounts?.maxSupply || 0}</Text>
            <Text>Probability: {cardCounts?.probability || 0}</Text>
          </>
        )}
      </div>

      <ArtContent
        pubkey={id}
        uri={uri}
        style={{
          width: '150px',
          height: '150px',
          justifyContent: 'start',
        }}
      />
    </div>
  )
};

export default memo(Item);
