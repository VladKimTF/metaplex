import { PackDistributionType, TokenAccount } from '@oyster/common';
import { Keypair } from '@solana/web3.js';
import BN from 'bn.js';

import { SafetyDepositDraft } from '../../actions/createAuctionManager';

export interface PackState extends InfoFormState {
  selectedItems: Record<string, SafetyDepositDraft>;
  selectedVouchers: Record<string, SafetyDepositDraft>;
  distributionType: PackDistributionType;
  probabilityByMetadataKey: Record<string, number>;
  supplyByMetadataKey: Record<string, number>;
  allowedAmountToRedeem: number;
  mutable: boolean;
  redeemStartDate?: moment.Moment | null;
  redeemEndDate?: moment.Moment | null;
  isUnlimitedSupply: boolean;
}

export interface InfoFormState {
  name: string;
  description: string;
  uri: string;
}

export interface SelectedItem {
  mint: string;
  maxSupply: BN | null;
  probability: BN | null;
  tokenAccount: TokenAccount;
  toAccount: Keypair;
  index: BN;
}

export interface SelectedVoucher {
  mint: string;
  tokenAccount: TokenAccount;
  index: BN;
}

export interface MapSelectedItemsParams
  extends Pick<
    PackState,
    'supplyByMetadataKey' | 'probabilityByMetadataKey' | 'selectedItems'
  > {
  accountByMint: Map<string, TokenAccount>;
}

export interface MapSelectedVouchersParams
  extends Pick<PackState, 'selectedVouchers'> {
  accountByMint: Map<string, TokenAccount>;
}
