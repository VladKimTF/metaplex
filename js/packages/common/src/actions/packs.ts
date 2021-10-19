import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { programIds } from '../utils/programIds';
import { findProgramAddress, StringPublicKey, toPublicKey } from '../utils';

export const PACKS_PREFIX = 'packs';
export const VOUCHER_PREFIX = 'voucher';

export async function getProgramAuthority(): Promise<StringPublicKey> {
  const PROGRAM_IDS = programIds();

  return (
    await findProgramAddress(
      [
        Buffer.from(PACKS_PREFIX),
        toPublicKey(PROGRAM_IDS.pack_create).toBuffer(),
      ],
      toPublicKey(PROGRAM_IDS.pack_create),
    )
  )[0];
}

export async function findPackCardProgramAddress(
  pack: PublicKey,
  index: BN,
): Promise<StringPublicKey> {
  return findProgramAddressByPrefix(pack, index, PACKS_PREFIX);
}

export async function findPackVoucherProgramAddress(
  pack: PublicKey,
  index: BN,
): Promise<StringPublicKey> {
  return findProgramAddressByPrefix(pack, index, VOUCHER_PREFIX);
}

async function findProgramAddressByPrefix(
  pack: PublicKey,
  index: BN,
  prefix: string,
): Promise<StringPublicKey> {
  const PROGRAM_IDS = programIds();

  return (
    await findProgramAddress(
      [toPublicKey(pack).toBuffer(), Buffer.from(prefix), index.toBuffer()],
      toPublicKey(PROGRAM_IDS.pack_create),
    )
  )[0];
}
