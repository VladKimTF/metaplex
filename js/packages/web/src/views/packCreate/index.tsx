import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { SafetyDepositDraft } from '../../actions/createAuctionManager';

import { PackState } from './interface';
import { INITIAL_PACK_STATE } from './data';
import { CreatePackSteps } from './types';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SelectItemsStep from './components/SelectItemsStep';
import AdjustQuantitiesStep from './components/AdjustQuantitiesStep';
import SalesSettingsStep from './components/SalesSettingsStep';

const PackCreateView = (): ReactElement => {
  const [step, setStep] = useState<CreatePackSteps>(
    CreatePackSteps.SelectItems,
  );
  const history = useHistory();
  const { step_param: stepParam }: { step_param: string } = useParams();
  const [attributes, setAttributes] = useState<PackState>(INITIAL_PACK_STATE);

  const { selectedItems, distribution, allowedAmountToRedeem, redeemEndDate } =
    attributes;

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
    <div className="pack-create-wrapper">
      <Sidebar step={step} setStep={setStep} />
      <div className="content-wrapper">
        <Header step={step} />

        {step === CreatePackSteps.SelectItems && (
          <SelectItemsStep
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
          />
        )}

        {step === CreatePackSteps.AdjustQuantities && (
          <AdjustQuantitiesStep
            allowedAmountToRedeem={allowedAmountToRedeem}
            selectedItems={selectedItems}
            distribution={distribution}
            setPackState={setPackState}
          />
        )}

        {step === CreatePackSteps.SalesSettings && (
          <SalesSettingsStep
            redeemEndDate={redeemEndDate}
            setPackState={setPackState}
          />
        )}
      </div>
    </div>
  );
};

export default PackCreateView;
