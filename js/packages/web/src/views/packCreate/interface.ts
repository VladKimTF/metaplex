import { PackDistributionType } from '@oyster/common';
import { SafetyDepositDraft } from '../../actions/createAuctionManager';
import { AuctionState } from '../auctionCreate';

export interface PackState extends AuctionState {
  vouchersItems: SafetyDepositDraft[];
  selectedItems: Record<string, SafetyDepositDraft>;
  vouchersCount: number[];
  cardsCount: Record<number, Record<number, string>>[];
  actionOnProve: string;
  distribution: string;
  formValues?: CreatePackFormValues;
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
