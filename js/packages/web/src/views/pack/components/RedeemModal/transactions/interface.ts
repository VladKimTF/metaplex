import { WalletContextState } from '@solana/wallet-adapter-react';
import { StringPublicKey, TokenAccount } from '@oyster/common';
import { Connection, PublicKey } from '@solana/web3.js';

export interface RedeemPackParams {
  wallet: WalletContextState;
  connection: Connection;
  accountByMint: Map<string, TokenAccount>;
  index: number;
  packSetKey: PublicKey;
  voucherToken: TokenAccount;
  userToken: TokenAccount;
  metadataMint: StringPublicKey;
  edition: StringPublicKey;
}

export interface RequestCardParams {
  index: number;
  packSetKey: StringPublicKey;
  edition: StringPublicKey;
  editionMint: StringPublicKey;
  tokenAccount: StringPublicKey;
  packVoucher: StringPublicKey;
  wallet: WalletContextState;
}
