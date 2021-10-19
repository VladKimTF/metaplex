import React, { memo, ReactElement } from 'react';
import { Form, Input, Button, Select, Switch, DatePicker } from 'antd';

import { CreatePackSteps } from '../../types';
import { CreatePackFormValues } from '../../interface';
import { CreatePackProps } from './interface';

const { Option } = Select;
const valueU32 = 4294967295;

const CreatePackStep = ({ setPackState, confirm }: CreatePackProps): ReactElement => {
  const onSubmit = (formValues: CreatePackFormValues) => {
    setPackState({ formValues });
    confirm(CreatePackSteps.AddVoucher);
  };

  return (
    <div className="form-box">
      <Form
        name="createPack"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
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

export default memo(CreatePackStep);
