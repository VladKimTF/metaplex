import { PackDistributionType } from '@oyster/common';
import { SafetyDepositDraft } from '../../actions/createAuctionManager';
import { AuctionState } from '../auctionCreate';

export interface PackState extends AuctionState {
  vouchersItems: SafetyDepositDraft[];
  selectedItems: Record<string, SafetyDepositDraft>;
  distribution: {
    distributionType: PackDistributionType;
    distributions: Record<string, number>;
  };
  vouchersCount: number[];
  cardsCount: Record<number, Record<number, string>>[];
  actionOnProve: string;
  formValues?: CreatePackFormValues;
  allowedAmountToRedeem: number;
}

export interface CreatePackFormValues {
  name: string;
  distributionType: PackDistributionType;
  allowedAmountToRedeem: number;
  uri: string;
  redeemStartDate: moment.Moment;
  redeemEndDate: moment.Moment;
  mutable: boolean;
}
