import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { serialize } from 'borsh';

import { ActivatePackArgs, SCHEMA } from '..';
import { programIds, toPublicKey } from '../../../utils';

interface Params {
  packSetKey: PublicKey;
  authority: string;
}

export async function activate({
  packSetKey,
  authority,
}: Params): Promise<TransactionInstruction> {
  const PROGRAM_IDS = programIds();

  const value = new ActivatePackArgs();
  const data = Buffer.from(serialize(SCHEMA, value));

  const keys = [
    // pack_set
    {
      pubkey: toPublicKey(packSetKey),
      isSigner: false,
      isWritable: true,
    },
    // signer authority
    {
      pubkey: toPublicKey(authority),
      isSigner: true,
      isWritable: false,
    },
  ];

  return new TransactionInstruction({
    keys,
    programId: toPublicKey(PROGRAM_IDS.pack_create),
    data,
  });
}
