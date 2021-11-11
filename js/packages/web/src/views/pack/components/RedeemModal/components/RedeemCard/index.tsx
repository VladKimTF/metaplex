import { Metadata, ParsedAccount } from '@oyster/common';
import React from 'react';

import { ArtContent } from '../../../../../../components/ArtContent';

interface IPropsRedeemCard {
  item: ParsedAccount<Metadata>;
  probability: number;
}

const RedeemCard = ({
  item: { info, pubkey },
  probability,
}: IPropsRedeemCard) => (
  <div className="modal-redeem__card">
    <div className="info">
      <div className="modal-redeem__image">
        <ArtContent pubkey={pubkey} uri={info.data.uri} preview={false} />
      </div>
      <div className="info__text">
        <p className="info__title">{info.data.name}</p>
      </div>
    </div>
    <div className="modal-redeem__percentage">
      <p>{`${probability.toFixed(1)}% chance`}</p>
    </div>
  </div>
);

export default RedeemCard;
