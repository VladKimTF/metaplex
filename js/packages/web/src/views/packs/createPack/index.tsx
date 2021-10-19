import React, { ReactElement } from 'react';
import { Form, Input, Button, Select, Switch, DatePicker } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransactionWithRetry, useConnection } from '@oyster/common';

import { CreatePackSteps } from '../createPackStepper/types';
import { getCreatePackInstructions } from './utils/getCreatePackInstructions';
import { CreatePackFormValues } from './interface';

const { Option } = Select;
const valueU32 = 4294967295;

interface CreatePackProps {
  confirm: (step?: CreatePackSteps) => void
}

const CreatePack = ({ confirm }: CreatePackProps): ReactElement => {
  const wallet = useWallet();
  const connection = useConnection();

  const onSubmit = async (values: CreatePackFormValues) => {
    try {
      const { instructions, signers } = await getCreatePackInstructions({ values, wallet, connection })

      await sendTransactionWithRetry(
        connection,
        wallet,
        instructions,
        signers,
        'single',
      )

      confirm(CreatePackSteps.AddVoucher);
    } catch (e) {
      console.log('Error while submitting Create Pack transaction', e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onMutableChange = (value: any) => {
    console.log('onMutableChange:', value);
  };

  return (
    <div className="form-box">
      <Form
        name="createPack"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input pack name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="distributionType"
          label="Distribution type"
          rules={[{ required: true }]}
        >
          <Select
            className="select"
            placeholder="Select a option and change input text above"
            onChange={onMutableChange}
            bordered={false}
            allowClear
          >
            <Option value="maxSupply">maxSupply</Option>
            <Option value="fixed">fixed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Allowed amount to redeem"
          name="allowedAmountToRedeem"
          rules={[
            {
              required: true,
              message: 'Please input allowed amount to redeem!',
            },
          ]}
        >
          <Input type={'number'} min={1} max={valueU32} />
        </Form.Item>

        <Form.Item
          label="Poster URL"
          name="uri"
          rules={[{ required: true, message: 'Please enter Poster URL' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Redeem start date" name="redeemStartDate">
          <DatePicker className="date-picker" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Redeem end date" name="redeemEndDate">
          <DatePicker className="date-picker" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Mutable" name="mutable" valuePropName="mutable">
          <Switch />
        </Form.Item>

        <Form.Item style={{ paddingTop: 30 }}>
          <Button type="primary" htmlType="submit">
            Next step
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePack;
