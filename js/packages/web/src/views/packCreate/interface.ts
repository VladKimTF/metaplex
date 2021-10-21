import { PackDistributionType } from '@oyster/common';
import { SafetyDepositDraft } from '../../actions/createAuctionManager';
import { AuctionState } from '../auctionCreate';

export interface PackState extends AuctionState, InfoFormState {
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
  redeemEndDate?: moment.Moment | null;
}

export interface InfoFormState {
  name: string;
  uri: string;
}

export interface CreatePackFormValues {
  redeemStartDate: moment.Moment;
  mutable: boolean;
}
