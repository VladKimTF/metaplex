import React from 'react';
import { Button, Typography } from 'antd';

import Item from './item';

const { Title } = Typography;

function FinalStep({ attributes, backButton }) {
  const voucher = attributes.vouchersItems[0];
  const packValues = attributes.initPackValues;

  return (
    <div className="form-box">
      <div>
        <Title level={3}>Pack: </Title>
        {
          packValues && (
            <div className="pack-wrapper">
              <div className="pack-values">
                <Title level={5}>
                  Name: {packValues.name}
                </Title>
                <Title level={5}>
                  Distribution Type: {packValues.distributionType}
                </Title>
                <Title level={5}>
                  Poster URL: {packValues.uri}
                </Title>
                <Title level={5}>
                  Allowed Amount To Redeem: {packValues.allowedAmountToRedeem}
                </Title>
                <Title level={5}>
                  Redeem Start Date: {packValues.redeemStartDate || 'Unselected'}
                </Title>
                <Title level={5}>
                  Redeem End Date: {packValues.redeemEndDate  || 'Unselected'}
                </Title>
                <Title level={5}>
                  Mutable: {packValues.mutable ? 'yes' : 'no'}
                </Title>
              </div>
            </div>
          )
        }

        <Title level={3}>Voucher: </Title>
        {
          voucher && Item(voucher, 'voucher', attributes)
        }

        <Title level={3}>Cards: </Title>
        {attributes.cardsItems?.map((card) => Item(card, 'card', attributes))}
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

export default FinalStep;
