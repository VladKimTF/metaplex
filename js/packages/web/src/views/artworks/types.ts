import { Metadata, ParsedAccount, StringPublicKey } from '@oyster/common';
import { PackSet } from '@oyster/common/dist/lib/models/packs/accounts/PackSet';
import { PackVoucher } from '@oyster/common/dist/lib/models/packs/accounts/PackVoucher';

export type ExtendedVoucher = ParsedAccount<PackVoucher> & {
  mint: StringPublicKey;
  masterEdition: StringPublicKey;
  masterEditionMint: StringPublicKey;
};

export type VoucherByKey = Record<string, ParsedAccount<PackVoucher>>;
export type ExtendedVoucherByKey = Record<string, ExtendedVoucher>;
export type PackByKey = Record<string, ParsedAccount<PackSet>>;
export type ExtendedPack = ParsedAccount<PackSet> & {
  voucher: StringPublicKey;
  edition: StringPublicKey;
};
export type ExtendedPackByKey = Record<string, ExtendedPack>;

export type Item = ParsedAccount<Metadata> | ExtendedPack;

export enum ArtworkViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}
