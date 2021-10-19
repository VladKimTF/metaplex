import {
  Connection,
  Keypair,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { BN } from 'bn.js';
import { initPackSet } from '@oyster/common/dist/lib/models/metaplex/packs/initPackSet';

import { CreatePackFormValues } from '../interface';
import { programIds } from '@oyster/common';

const ACCOUNT_DATA_LENGTH = 338;

interface SetupInitPackInstructionsParams {
  values: CreatePackFormValues;
  wallet: WalletContextState;
  connection: Connection;
}

function stringToUint32Array(str: string): Uint32Array {
  const array = new Uint32Array(32);

  [...str].forEach((char, index) => (array[index] = char.charCodeAt(0)));

  return array;
}

export async function getCreatePackInstructions({
  values,
  wallet,
  connection,
}: SetupInitPackInstructionsParams): Promise<{
  instructions: TransactionInstruction[];
  signers: any;
}> {
  const {
    name,
    distributionType,
    uri,
    allowedAmountToRedeem = 1,
    redeemStartDate,
    redeemEndDate,
    mutable = false,
  } = values;

  const packSet = Keypair.generate();
  const packSetRentExempt = await connection.getMinimumBalanceForRentExemption(
    ACCOUNT_DATA_LENGTH,
  );
  const instructions: TransactionInstruction[] = [];

  if (wallet?.publicKey) {
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: wallet?.publicKey,
        newAccountPubkey: packSet.publicKey,
        lamports: packSetRentExempt,
        space: ACCOUNT_DATA_LENGTH,
        programId: programIds().pack_create,
      }),
    );
  }

  const nameUint32 = stringToUint32Array(name);

  if (packSet.publicKey && wallet.publicKey) {
    const instruction = await initPackSet({
      name: nameUint32,
      uri,
      mutable,
      distributionType,
      allowedAmountToRedeem: new BN(allowedAmountToRedeem),
      redeemStartDate: redeemStartDate
        ? new BN(redeemStartDate.valueOf())
        : null,
      redeemEndDate: redeemEndDate ? new BN(redeemEndDate.valueOf()) : null,
      packSetKey: packSet.publicKey,
      authority: wallet.publicKey.toBase58(),
    });

    instructions.push(instruction);
  }

  return { instructions, signers: [packSet] };
}
