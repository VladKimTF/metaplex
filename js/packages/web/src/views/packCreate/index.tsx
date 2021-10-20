import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Row, Col, Steps } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import useWindowDimensions from '../../utils/layout';
import { SafetyDepositDraft } from '../../actions/createAuctionManager';

import { PackState } from './interface';
import { INITIAL_PACK_STATE, STEPS_TITLES } from './data';
import { CreatePackSteps } from './types';

import SelectItemsStep from './components/SelectItemsStep';
import Header from './components/Header';

const { Step } = Steps;

const PackCreateView = (): ReactElement => {
  const [step, setStep] = useState<CreatePackSteps>(
    CreatePackSteps.SelectItems,
  );
  const { width } = useWindowDimensions();
  const history = useHistory();
  const { step_param: stepParam }: { step_param: string } = useParams();
  const [attributes, setAttributes] = useState<PackState>(INITIAL_PACK_STATE);

  const { selectedItems } = attributes;

  useEffect(() => {
    if (stepParam) {
      return setStep(parseInt(stepParam));
    }

    goToNextStep(CreatePackSteps.SelectItems);
  }, [stepParam]);

  const goToNextStep = (nextStep?: CreatePackSteps) => {
    const historyNextStep = nextStep === undefined ? step + 1 : nextStep;
    history.push(`/admin/pack/create/${historyNextStep.toString()}`);
  };

  const setPackState = useCallback(
    (value: Partial<PackState>) => {
      setAttributes({ ...attributes, ...value });
    },
    [attributes],
  );

  const handleSelectItem = useCallback(
    (item: SafetyDepositDraft): void => {
      const { metadata } = item;

      if (!metadata?.pubkey) {
        return;
      }

      const updatedSelectedItems = { ...selectedItems };

      if (updatedSelectedItems[metadata.pubkey]) {
        delete updatedSelectedItems[metadata.pubkey];
      } else {
        updatedSelectedItems[metadata.pubkey] = item;
      }

      setPackState({ selectedItems: updatedSelectedItems });
    },
    [selectedItems],
  );

  return (
    <>
      <Row style={{ paddingTop: 50 }}>
        <Col span={24} md={4}>
          <Steps
            progressDot
            direction={width < 768 ? 'horizontal' : 'vertical'}
            current={step}
            style={{
              width: 'fit-content',
              margin: '0 auto 30px auto',
              overflowX: 'auto',
              maxWidth: '100%',
            }}
          >
            {Object.entries(STEPS_TITLES).map(([step, title]) => (
              <Step title={title} key={step} />
            ))}
          </Steps>
        </Col>
        <Col span={24} md={20}>
          <Header step={step} />
          {step === CreatePackSteps.SelectItems && (
            <SelectItemsStep
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default PackCreateView;
