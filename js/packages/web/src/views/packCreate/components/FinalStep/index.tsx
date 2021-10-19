import React, { memo, ReactElement } from 'react';
import { Button, Typography } from 'antd';

import Item from './components/Item';
import { ItemType } from './components/Item/types';
import { FinalStepProps } from './interface';

const { Title } = Typography;

const FinalStep = ({ attributes: { vouchersItems, formValues, cardsItems, cardsCount }, backButton }: FinalStepProps): ReactElement => {
  const voucher = vouchersItems[0];
  const { name, distributionType, uri, allowedAmountToRedeem, redeemStartDate, redeemEndDate, mutable } = formValues || {};

  return (
    <div className="form-box">
      <div>
        <Title level={3}>Pack: </Title>
        {formValues && (
          <div className="pack-wrapper">
            <div className="pack-values">
              <Title level={5}>
                Name: {name}
              </Title>
              <Title level={5}>
                Distribution Type: {distributionType}
              </Title>
              <Title level={5}>
                Poster URL: {uri}
              </Title>
              <Title level={5}>
                Allowed Amount To Redeem: {allowedAmountToRedeem}
              </Title>
              <Title level={5}>
                Redeem Start Date: {redeemStartDate || 'Unselected'}
              </Title>
              <Title level={5}>
                Redeem End Date: {redeemEndDate  || 'Unselected'}
              </Title>
              <Title level={5}>
                Mutable: {mutable ? 'yes' : 'no'}
              </Title>
            </div>
          </div>
        )}

        <Title level={3}>Voucher: </Title>
        {voucher && <Item item={voucher} type={ItemType.Voucher} cardsCount={cardsCount} />}

        <Title level={3}>Cards: </Title>
        {cardsItems?.map((card) => <Item key={card.metadata.pubkey} item={card} type={ItemType.Card} cardsCount={cardsCount} />)}
      </div>
      <div style={{ display: "flex" }}>
        <Button type="primary" htmlType="submit">
          Create pack
        </Button>
        {backButton}
      </div>
    </div>
  );
}

export default memo(FinalStep);
