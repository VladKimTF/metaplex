import { PackDistributionType } from '@oyster/common';
import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { PackState } from '../../interface';

export interface AdjustQuantitiesStepProps {
  distribution: {
    distributionType: PackDistributionType;
    distributions: Record<string, string>;
  };
  selectedItems: Record<string, SafetyDepositDraft>;
  setPackState: (values: Partial<PackState>) => void;
}
