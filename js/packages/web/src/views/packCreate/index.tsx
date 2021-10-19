import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Steps, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import useWindowDimensions from '../../utils/layout';

import { PackState } from './interface';
import { INITIAL_PACK_STATE, STEPS_TITLES } from './data';
import { CreatePackSteps } from './types';

import CreatePackStep from './components/CreatePackStep';
import AddVoucherStep from './components/AddVoucherStep';
import AddCardStep from './components/AddCardStep';
import FinalStep from './components/FinalStep';

const { Step } = Steps;

const PackCreateView = (): ReactElement => {
  const [step, setStep] = useState<CreatePackSteps>(CreatePackSteps.CreatePack);
  const { width } = useWindowDimensions();
  const history = useHistory();
  const { step_param: stepParam }: { step_param: string } = useParams();

  const [attributes, setAttributes] = useState<PackState>(INITIAL_PACK_STATE);

  useEffect(() => {
    if (stepParam) {
      return setStep(parseInt(stepParam));
    }

    goToNextStep(CreatePackSteps.CreatePack);
  }, [stepParam]);

  const goToNextStep = (nextStep?: CreatePackSteps) => {
    const historyNextStep = nextStep === undefined ? step + 1 : nextStep;
    history.push(`/admin/pack/create/${historyNextStep.toString()}`);
  };

  const setPackState = useCallback((value: Partial<PackState>) => {
    setAttributes({ ...attributes, ...value });
  }, [attributes])

  const renderBackButton = () => (
    <div style={{ margin: 'auto', width: 'fit-content' }}>
      <Button
        onClick={() => goToNextStep(step - 1)}
        style={{ height: 50 }}
      >
        Back
      </Button>
    </div>
  );

  return (
    <>
      <Row style={{ marginBottom: 30 }}>
        <Col span={8}>
          <Typography.Title
            level={3}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            Create Pack
          </Typography.Title>
        </Col>

        <Col
          span={4}
          offset={12}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <Button onClick={() => history.push(`/admin/packs`)}>
            List of Packs
          </Button>
        </Col>
      </Row>

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
          {step === CreatePackSteps.CreatePack && (
            <CreatePackStep
              setPackState={setPackState}
              confirm={goToNextStep}
            />
          )}

          {step === CreatePackSteps.AddVoucher && (
            <AddVoucherStep
              vouchersItems={attributes.vouchersItems}
              vouchersCount={attributes.vouchersCount}
              setPackState={setPackState}
              confirm={goToNextStep}
              backButton={renderBackButton()}
            />
          )}

          {step === CreatePackSteps.AddCard && (
            <AddCardStep
              cardsItems={attributes.cardsItems}
              cardsCount={attributes.cardsCount}
              setPackState={setPackState}
              confirm={goToNextStep}
              backButton={renderBackButton()}
              distribution={attributes.distribution}
            />
          )}

          {step === CreatePackSteps.Final && (
            <FinalStep
              attributes={attributes}
              backButton={renderBackButton()}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default PackCreateView;
