import { PackDistributionType } from '@oyster/common';
import React, { memo, ReactElement } from 'react';
import { Input } from 'antd';

import ItemRow from '../ItemRow';
import SelectCard from '../SelectCard';

import { AdjustQuantitiesStepProps } from './interface';

const AdjustQuantitiesStep = ({
  allowedAmountToRedeem,
  distribution,
  setPackState,
  selectedItems,
}: AdjustQuantitiesStepProps): ReactElement => {
  const { distributions, distributionType } = distribution;
  const title =
    distributionType === PackDistributionType.fixed
      ? 'REDEEM PROBABILITY'
      : 'NUMBER OF NFTs';

  const handleRedeemAmountChange = (value: string): void => {
    setPackState({
      allowedAmountToRedeem: parseInt(value),
    });
  };

  const handleDistributionChange = (pubKey: string, value: string): void => {
    setPackState({
      distribution: {
        ...distribution,
        distributions: { ...distributions, [pubKey]: parseInt(value) },
      },
    });
  };

  const handleDistributionTypeChange = (type: PackDistributionType): void => {
    setPackState({
      distribution: {
        ...distribution,
        distributionType: type,
      },
    });
  };

  return (
    <div className="quantities-step-wrapper">
      <p className="quantities-step-wrapper__title">
        Set number of redeem attempts
      </p>
      <p className="quantities-step-wrapper__subtitle">
        Number of times user can try to redeem a card.
      </p>
      <Input
        className="quantities-step-wrapper__input"
        type="number"
        value={allowedAmountToRedeem}
        onChange={({ target: { value } }) => handleRedeemAmountChange(value)}
      />

      <p className="quantities-step-wrapper__title">Select distribution type</p>
      <div className="cards-select">
        <SelectCard
          title="Fixed"
          subtitle="Fixed chance of getting each card in percentages"
          isSelected={distributionType === PackDistributionType.fixed}
          onClick={() =>
            handleDistributionTypeChange(PackDistributionType.fixed)
          }
        />
        <SelectCard
          title="Max Supply"
          subtitle="The chance of getting a card will be based on the card's supply that is left"
          isSelected={distributionType === PackDistributionType.max_supply}
          onClick={() =>
            handleDistributionTypeChange(PackDistributionType.max_supply)
          }
        />
      </div>

      <p>{title}</p>
      {Object.values(selectedItems).map(item => (
        <ItemRow
          onInputChange={(value): void =>
            handleDistributionChange(item.metadata.pubkey, value)
          }
          inputValue={distribution[item.metadata.pubkey]}
          key={item.metadata.pubkey}
          item={item}
        />
      ))}
    </div>
  );
};

export default memo(AdjustQuantitiesStep);
