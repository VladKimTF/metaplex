import {
  PublicKey,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
} from '@solana/web3.js';
import { serialize } from 'borsh';

import { InitPackSetArgs, SCHEMA } from '..';
import { programIds, toPublicKey } from '../../../utils';
import { InitPackSetParams } from './interface';

interface Params extends InitPackSetParams {
  packSetKey: PublicKey;
  authority: string;
}

export async function initPackSet({
  name,
  uri,
  mutable,
  distributionType,
  allowedAmountToRedeem,
  redeemStartDate,
  redeemEndDate,
  packSetKey,
  authority,
}: Params): Promise<TransactionInstruction> {
  const PROGRAM_IDS = programIds();

  const value = new InitPackSetArgs({
    name,
    uri,
    mutable,
    distributionType,
    allowedAmountToRedeem,
    redeemStartDate,
    redeemEndDate,
  });

  const data = Buffer.from(serialize(SCHEMA, value));
  const keys = [
    {
      pubkey: toPublicKey(packSetKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(authority),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: toPublicKey(authority),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: toPublicKey(SYSVAR_RENT_PUBKEY),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: toPublicKey(SYSVAR_CLOCK_PUBKEY),
      isSigner: false,
      isWritable: false,
    },
  ];

  return new TransactionInstruction({
    keys,
    programId: toPublicKey(PROGRAM_IDS.pack_create),
    data,
  });
}
