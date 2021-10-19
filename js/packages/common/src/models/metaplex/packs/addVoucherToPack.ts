import {
  PublicKey,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';
import BN from 'bn.js';
import { serialize } from 'borsh';

import { AddVoucherToPackArgs, SCHEMA } from '..';
import {
  findPackVoucherProgramAddress,
  getEdition,
  getMetadata,
  getProgramAuthority,
} from '../../..';
import { StringPublicKey, programIds, toPublicKey } from '../../../utils';
import { AddVoucherToPackParams } from './interface';

interface Params extends AddVoucherToPackParams {
  index: BN;
  packSetKey: PublicKey;
  authority: string;
  mint: StringPublicKey;
  tokenOwner: StringPublicKey;
  tokenAccount: StringPublicKey;
}

export async function addVoucherToPack({
  numberToOpen,
  actionOnProve,
  index,
  packSetKey,
  authority,
  mint,
  tokenOwner,
  tokenAccount,
}: Params): Promise<TransactionInstruction> {
  const PROGRAM_IDS = programIds();

  const value = new AddVoucherToPackArgs({
    numberToOpen,
    actionOnProve,
  });

  const masterMetadataKey = await getMetadata(mint);
  const masterEdition = await getEdition(mint);
  const programAuthority = await getProgramAuthority();
  const packVoucher = await findPackVoucherProgramAddress(packSetKey, index);

  const data = Buffer.from(serialize(SCHEMA, value));
  const keys = [
    // pack_set
    {
      pubkey: toPublicKey(packSetKey),
      isSigner: false,
      isWritable: true,
    },
    // pack_voucher
    {
      pubkey: toPublicKey(packVoucher),
      isSigner: false,
      isWritable: true,
    },
    // signer authority
    {
      pubkey: toPublicKey(authority),
      isSigner: true,
      isWritable: true,
    },
    // master_edition
    {
      pubkey: toPublicKey(masterEdition),
      isSigner: false,
      isWritable: false,
    },
    // master_metadata
    {
      pubkey: toPublicKey(masterMetadataKey),
      isSigner: false,
      isWritable: false,
    },
    // mint
    {
      pubkey: toPublicKey(mint),
      isSigner: false,
      isWritable: false,
    },
    // source
    {
      pubkey: toPublicKey(tokenOwner),
      isSigner: false,
      isWritable: true,
    },
    // token_account
    {
      pubkey: toPublicKey(tokenAccount),
      isSigner: false,
      isWritable: true,
    },
    // program_authority
    {
      pubkey: toPublicKey(programAuthority),
      isSigner: false,
      isWritable: false,
    },
    // rent
    {
      pubkey: toPublicKey(SYSVAR_RENT_PUBKEY),
      isSigner: false,
      isWritable: false,
    },
    // system_program
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    // spl_token program
    {
      pubkey: programIds().token,
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
