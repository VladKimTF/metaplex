import React, { memo, ReactElement } from 'react';
import { Form, Button, Space } from 'antd';
import { Creator } from '@oyster/common';

import { ArtSelector } from "../../../auctionCreate/artSelector";
import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { CreatePackSteps } from '../../types';
import { AddVoucherStepProps } from './interface';

const AddVoucherStep = ({ setPackState, confirm, vouchersItems, vouchersCount, backButton }: AddVoucherStepProps): ReactElement  => {
  const onSubmit = (values: any) => {
    console.log('Success:', values);
    confirm(CreatePackSteps.AddCard)
  };

  const onSubmitFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const artistFilter = (i: SafetyDepositDraft) =>
    !(i.metadata.info.data.creators || []).find((c: Creator) => !c.verified);

  return (
    <div className="form-box">
      <Form
        name="addVoucher"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
        layout="vertical"
      >
        <ArtSelector
          title="Select the NFT that you want add to Pack"
          description="Select the NFT that you want to add"
          filter={artistFilter}
          selected={vouchersItems}
          setSelected={vouchersItems => {
            setPackState({ vouchersItems });
          }}
          selectedCount={id => vouchersCount[id]}
          allowMultiple={false}
        >
          Select NFT
        </ArtSelector>

        <Space style={{ marginTop: 30 }}>
          <Form.Item style={{ margin: 0 }}>
            <Button type="primary" htmlType="submit" style={{ height: 50 }}>
              Next step
            </Button>
          </Form.Item>
          {backButton}
        </Space>
      </Form>
    </div>
  );
};

export default memo(AddVoucherStep);
