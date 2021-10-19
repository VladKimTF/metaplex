import BN from 'bn.js';
import { PackDistributionType } from '..';

export interface InitPackSetParams {
  name: Uint32Array;
  uri: string;
  mutable: boolean;
  distributionType: PackDistributionType;
  allowedAmountToRedeem: BN;
  redeemStartDate: BN | null;
  redeemEndDate: BN | null;
}

export interface AddCardToPackParams {
  maxSupply: BN | null;
  probability: BN | null;
  index: BN;
}

export enum ActionOnProve {
  Burn,
  Redeem,
}

export interface AddVoucherToPackParams {
  numberToOpen: BN;
  actionOnProve: ActionOnProve;
}
