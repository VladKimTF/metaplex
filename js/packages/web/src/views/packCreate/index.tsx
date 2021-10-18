import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { Form } from 'antd';
import {
  PackDistributionType,
  useConnection,
  useUserAccounts,
} from '@oyster/common';

import { SafetyDepositDraft } from '../../actions/createAuctionManager';
import { useUserArts } from '../../hooks';

import { InfoFormState, PackState } from './interface';
import { INITIAL_PACK_STATE } from './data';
import { CreatePackSteps } from './types';
import { packItemsFilter, vouchersFilter } from './utils';
import useStep from './hooks/useStep';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SelectItemsStep from './components/SelectItemsStep';
import AdjustQuantitiesStep from './components/AdjustQuantitiesStep';
import DesignAndInfoStep from './components/DesignAndInfoStep';
import ReviewAndMintStep from './components/ReviewAndMintStep';
import { sendCreatePack } from './transactions/createPack';
import { useWallet } from '@solana/wallet-adapter-react';

export const PackCreateView = (): ReactElement => {
  const [attributes, setAttributes] = useState<PackState>(INITIAL_PACK_STATE);
  const items = useUserArts();
  const { step, goToNextStep } = useStep();
  const wallet = useWallet();
  const connection = useConnection();
  const { accountByMint } = useUserAccounts();

  const [designForm] = Form.useForm<InfoFormState>();

  const {
    selectedItems,
    selectedVouchers,
    distributionType,
    probabilityByMetadataKey,
    supplyByMetadataKey,
    allowedAmountToRedeem,
    name,
    description,
    uri,
    isUnlimitedSupply,
  } = attributes;

  const itemsToSelect = useMemo(
    () => items.filter(packItemsFilter(selectedItems, isUnlimitedSupply)),
    [items, selectedItems],
  );
  const vouchersToSelect = useMemo(
    () => items.filter(vouchersFilter(selectedItems)),
    [items, selectedItems],
  );

  const setPackState = useCallback(
    (value: Partial<PackState>) => {
      setAttributes({ ...attributes, ...value });
    },
    [attributes, setAttributes],
  );

  const handleSelectItem = useCallback(
    (item: SafetyDepositDraft): void => {
      const { metadata, masterEdition } = item;

      if (!metadata?.pubkey) {
        return;
      }

      const updatedSelectedItems = { ...selectedItems };

      if (updatedSelectedItems[metadata.pubkey]) {
        delete updatedSelectedItems[metadata.pubkey];
      } else {
        updatedSelectedItems[metadata.pubkey] = item;
      }

      const isUnlimitedSupply = masterEdition?.info.maxSupply === undefined;

      setPackState({
        selectedItems: updatedSelectedItems,
        distributionType: isUnlimitedSupply
          ? PackDistributionType.Unlimited
          : PackDistributionType.Fixed,
        isUnlimitedSupply,
      });
    },
    [setPackState, selectedItems],
  );

  const handleSelectVoucher = useCallback(
    (item: SafetyDepositDraft): void => {
      const { metadata } = item;

      if (!metadata?.pubkey) {
        return;
      }

      let updatedSelectedVouchers = { ...selectedVouchers };

      if (updatedSelectedVouchers[metadata.pubkey]) {
        delete updatedSelectedVouchers[metadata.pubkey];
      } else {
        updatedSelectedVouchers = { [metadata.pubkey]: item };
      }

      setPackState({ selectedVouchers: updatedSelectedVouchers });
    },
    [setPackState, selectedVouchers],
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    const canSubmit =
      wallet &&
      !!Object.values(selectedItems).length &&
      !!Object.values(selectedVouchers).length;

    if (canSubmit) {
      await sendCreatePack({
        wallet,
        connection,
        accountByMint,
        data: attributes,
      });
    }
  }, [wallet, connection, accountByMint, attributes]);

  return (
    <div className="pack-create-wrapper">
      <Sidebar step={step} setStep={goToNextStep} submit={handleSubmit} />
      <div className="content-wrapper">
        <Header step={step} />

        {step === CreatePackSteps.SelectItems && (
          <SelectItemsStep
            items={itemsToSelect}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
          />
        )}

        {step === CreatePackSteps.SelectVoucher && (
          <SelectItemsStep
            items={vouchersToSelect}
            selectedItems={selectedVouchers}
            handleSelectItem={handleSelectVoucher}
            showSupply
          />
        )}

        {step === CreatePackSteps.AdjustQuantities && (
          <AdjustQuantitiesStep
            allowedAmountToRedeem={allowedAmountToRedeem}
            selectedItems={selectedItems}
            distributionType={distributionType}
            probabilityByMetadataKey={probabilityByMetadataKey}
            supplyByMetadataKey={supplyByMetadataKey}
            isUnlimited={isUnlimitedSupply}
            setPackState={setPackState}
          />
        )}

        {/* {step === CreatePackSteps.SalesSettings && (
          <SalesSettingsStep
            redeemEndDate={redeemEndDate}
            setPackState={setPackState}
          />
        )} */}

        {step === CreatePackSteps.DesignAndInfo && (
          <DesignAndInfoStep form={designForm} setPackState={setPackState} />
        )}

        {step === CreatePackSteps.ReviewAndMint && (
          <ReviewAndMintStep
            uri={uri}
            name={name}
            description={description}
            distributionType={distributionType}
            allowedAmountToRedeem={allowedAmountToRedeem}
            supplyByMetadataKey={supplyByMetadataKey}
          />
        )}
      </div>
    </div>
  );
};
