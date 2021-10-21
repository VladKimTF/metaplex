import { PackDistributionType } from '@oyster/common';
import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { PackState } from '../../interface';

export interface AdjustQuantitiesStepProps {
  allowedAmountToRedeem: number;
  distribution: {
    distributionType: PackDistributionType;
    distributions: Record<string, number>;
  };
  selectedItems: Record<string, SafetyDepositDraft>;
  setPackState: (values: Partial<PackState>) => void;
}
