import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Steps, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import CreatePack from '../createPack';
import AddVoucher from '../voucher';
import AddCard from '../card';
import FinalStep from '../final';
import useWindowDimensions from '../../../utils/layout';
import { CreatePackSteps, PackState } from './types';
import { STEPS_TITLES } from './data';

const { Step } = Steps;

function CreatePackStepper() {
  const [step, setStep] = useState<CreatePackSteps>(CreatePackSteps.CreatePack);
  const { width } = useWindowDimensions();
  const history = useHistory();
  const { step_param }: { step_param: string } = useParams();

  const [attributes, setAttributes] = useState<PackState>({
    category: 3,
    reservationPrice: 0,
    items: [],
    cardsItems: [],
    vouchersItems: [],
    vouchersCount: [],
    cardsCount: [],
    auctionDurationType: 'minutes',
    gapTimeType: 'minutes',
    winnersCount: 1,
    actionOnProve: 'Burn',
    distribution: 'fixed',
  });

  useEffect(() => {
    if (step_param) setStep(parseInt(step_param));
    else goToNextStep(CreatePackSteps.CreatePack);
  }, [step_param]);

  const goToNextStep = (nextStep?: CreatePackSteps) => {
    const historyNextStep = nextStep === undefined ? step + 1 : nextStep;
    history.push(`/admin/pack/create/${historyNextStep.toString()}`);
  };

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
            <CreatePack
              confirm={goToNextStep}
            />
          )}

          {step === CreatePackSteps.AddVoucher && (
            <AddVoucher
              attributes={attributes}
              setAttributes={setAttributes}
              confirm={goToNextStep}
              backButton={renderBackButton()}
            />
          )}

          {step === CreatePackSteps.AddCard && (
            <AddCard
              attributes={attributes}
              setAttributes={setAttributes}
              confirm={goToNextStep}
              backButton={renderBackButton()}
              distribution={attributes.distribution}
            />
          )}

          {step === CreatePackSteps.Final && (
            <FinalStep
              attributes={attributes}
              confirm={goToNextStep}
              backButton={renderBackButton()}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default CreatePackStepper;
