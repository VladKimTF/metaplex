import React, { memo, ReactElement, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { Form, Input, Button, Space, Row, Col, Checkbox } from 'antd';
import { Creator } from '@oyster/common';

import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { ArtSelector } from '../../../auctionCreate/artSelector';
import { ArtContent } from '../../../../components/ArtContent';
import { CreatePackSteps } from '../../types';
import { AddCardStepProps } from './interface';

const breakpointColumnsListObj = {
  default: 1,
};

const AddCardStep = ({
  confirm,
  setPackState,
  cardsItems,
  cardsCount,
  backButton,
  distribution,
}: AddCardStepProps): ReactElement => {
  const onSubmit = (values: any) => {
    console.log('Success:', values);
    confirm(CreatePackSteps.Final);
  };

  const onSubmitFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCardsCountUpdate = (e, id, targetName: string) => {
    const { value } = e.target;
    const cards = cardsCount;
    const hasCard = cards.find(card => card[id]);

    if (cards.length && hasCard) {
      cards.map(card => {
        const cardValues = card[id];
        if (cardValues) {
          cardValues[targetName] = value;
        }
      });
    } else {
      cards.push({
        [id]: {
          [targetName]: value,
        },
      });
    }

    setPackState({ cardsCount: cards });
  };

  const artistFilter = (i: SafetyDepositDraft) =>
    !(i.metadata.info.data.creators || []).find((c: Creator) => !c.verified);

  const selected = cardsItems;
  const selectedItems = useMemo<Set<string>>(
    () => new Set(selected.map(item => item.metadata.pubkey)),
    [selected],
  );

  const handleSelected = cardsItems => {
    setPackState({ cardsItems });
  };

  const renderList = items => (
    <Masonry
      breakpointCols={breakpointColumnsListObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      style={{ width: '100%' }}
    >
      <div style={{ padding: '20px 0' }}>
        <Row style={{ paddingLeft: '30px' }}>
          <Col flex="10%" style={{ textAlign: 'start' }}>
            Preview
          </Col>
          <Col
            flex="60%"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Name
          </Col>
          <Col flex="10%" style={{ textAlign: 'center' }}>
            Probability
          </Col>
          <Col flex="10%" style={{ textAlign: 'center' }}>
            Max Supply
          </Col>
          <Col flex="10%" style={{ textAlign: 'center' }}>
            Count
          </Col>
        </Row>
        {items.map(m => {
          const id = m.metadata.pubkey;
          const { name, uri } = m.metadata?.info?.data;
          const isSelected = selectedItems.has(id);

          const onSelect = () => {
            const list = [...selectedItems.keys()];

            const newSet = isSelected
              ? new Set(list.filter(item => item !== id))
              : new Set([...list, id]);

            const selected = items.filter(item =>
              newSet.has(item.metadata.pubkey),
            );

            handleSelected(selected);
          };

          return (
            <div
              key={id}
              style={{
                display: 'flex',
                padding: '5px 0',
                borderBottom: '1px solid rgb(96 96 96)',
              }}
            >
              <Checkbox
                checked={isSelected}
                onChange={onSelect}
                style={{
                  width: 35,
                  paddingRight: 10,
                  alignItems: 'center',
                  marginBottom: '0.4em',
                }}
              />
              <Row justify={'space-between'} style={{ width: '100%' }}>
                <Col flex="10%">
                  <div style={{ width: '40px' }}>
                    <ArtContent
                      pubkey={id}
                      uri={uri}
                      style={{
                        width: '40px',
                        height: '40px',
                        alignItems: 'start',
                      }}
                    />
                  </div>
                </Col>
                <Col
                  flex="60%"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'self-start',
                  }}
                >
                  <p style={{ color: 'white', margin: 0 }}>{name}</p>
                  <p style={{ margin: 0 }}>{id}</p>
                </Col>
                <Col flex="10%" style={{ padding: '0 5px' }}>
                  <Input
                    onChange={e => handleCardsCountUpdate(e, id, 'probability')}
                    type="number"
                    min={0}
                    max={1000}
                    disabled={!isSelected || distribution === 'fixed'}
                  />
                </Col>
                <Col flex="10%" style={{ padding: '0 5px' }}>
                  <Input
                    onChange={e => handleCardsCountUpdate(e, id, 'maxSupply')}
                    type="number"
                    min={0}
                    max={1000}
                    disabled={!isSelected}
                  />
                </Col>
                <Col flex="10%" style={{ padding: '0 5px' }}>
                  <Input
                    onChange={e => handleCardsCountUpdate(e, id, 'count')}
                    type="number"
                    min={0}
                    max={1000}
                    disabled={!isSelected}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </Masonry>
  );

  return (
    <div className="form-box">
      <Form
        name="addCard"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
          selected={cardsItems}
          setSelected={cardsItems => {
            setPackState({ cardsItems });
          }}
          selectedCount={id => cardsCount[id]}
          allowMultiple
          renderList={renderList}
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
}

export default memo(AddCardStep);
