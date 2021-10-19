import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { programIds } from '../utils/programIds';
import { findProgramAddress, StringPublicKey, toPublicKey } from '../utils';

export const PACKS_PREFIX = 'packs';

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
  const PROGRAM_IDS = programIds();

  return (
    await findProgramAddress(
      [
        Buffer.from(PACKS_PREFIX),
        toPublicKey(pack).toBuffer(),
        index.toBuffer(),
      ],
      toPublicKey(PROGRAM_IDS.pack_create),
    )
  )[0];
}
