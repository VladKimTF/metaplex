import {
  PublicKey,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';
import { serialize } from 'borsh';

import { programIds, toPublicKey, StringPublicKey } from '../../../utils';
import {
  ClaimPackArgs,
  getEdition,
  getEditionMarkPda,
  getMetadata,
  PACKS_SCHEMA,
} from '../../..';
import {
  findPackCardProgramAddress,
  findProvingProcessProgramAddress,
  getProgramAuthority,
} from '../find';
import BN from 'bn.js';

interface Params {
  index: number;
  packSetKey: PublicKey;
  wallet: PublicKey;
  voucherToken: StringPublicKey;
  voucherMint: StringPublicKey;
  userToken: StringPublicKey;
  newMint: StringPublicKey;
  metadataMint: StringPublicKey;
  edition: BN;
}

export async function claimPack({
  index,
  packSetKey,
  wallet,
  voucherToken,
  voucherMint,
  userToken,
  newMint,
  metadataMint,
  edition,
}: Params): Promise<TransactionInstruction> {
  const PROGRAM_IDS = programIds();

  const value = new ClaimPackArgs();

  const provingProcess = await findProvingProcessProgramAddress(
    packSetKey,
    toPublicKey(voucherMint),
  );
  const packCard = await findPackCardProgramAddress(packSetKey, index);

  const newMetadata = await getMetadata(newMint);
  const metadata = await getMetadata(metadataMint);
  const newEdition = await getEdition(newMint);
  const masterEdition = await getEdition(metadataMint);
  const editionMarkPda = await getEditionMarkPda(metadataMint, edition);
  const programAuthority = await getProgramAuthority();

  const data = Buffer.from(serialize(PACKS_SCHEMA, value));
  const keys = [
    // pack_set
    {
      pubkey: toPublicKey(packSetKey),
      isSigner: false,
      isWritable: true,
    },
    // proving_process
    {
      pubkey: toPublicKey(provingProcess),
      isSigner: false,
      isWritable: true,
    },
    // user_wallet
    {
      pubkey: wallet,
      isSigner: true,
      isWritable: true,
    },
    // user_voucher_token
    {
      pubkey: toPublicKey(voucherToken),
      isSigner: false,
      isWritable: false,
    },
    // program_authority
    {
      pubkey: toPublicKey(programAuthority),
      isSigner: false,
      isWritable: false,
    },
    // pack_card
    {
      pubkey: toPublicKey(packCard),
      isSigner: false,
      isWritable: true,
    },
    // user_token_acc
    {
      pubkey: toPublicKey(userToken),
      isSigner: false,
      isWritable: true,
    },
    // new_metadata_acc
    {
      pubkey: toPublicKey(newMetadata),
      isSigner: false,
      isWritable: true,
    },
    // new_edition_acc
    {
      pubkey: toPublicKey(newEdition),
      isSigner: false,
      isWritable: true,
    },
    // master_edition_acc
    {
      pubkey: toPublicKey(masterEdition),
      isSigner: false,
      isWritable: true,
    },
    // new_mint_account
    {
      pubkey: toPublicKey(newMint),
      isSigner: false,
      isWritable: true,
    },
    // new_mint_authority_acc
    {
      pubkey: wallet,
      isSigner: true,
      isWritable: true,
    },
    // metadata_acc
    {
      pubkey: toPublicKey(metadata),
      isSigner: false,
      isWritable: true,
    },
    // metadata_mint_acc
    {
      pubkey: toPublicKey(metadataMint),
      isSigner: false,
      isWritable: true,
    },
    // edition_mark
    {
      pubkey: toPublicKey(editionMarkPda),
      isSigner: false,
      isWritable: true,
    },
    // rent
    {
      pubkey: toPublicKey(SYSVAR_RENT_PUBKEY),
      isSigner: false,
      isWritable: false,
    },
    // randomness_oracle
    {
      pubkey: programIds().oracle,
      isSigner: false,
      isWritable: false,
    },
    // metaplex_token_metadata
    {
      pubkey: toPublicKey(programIds().metadata),
      isSigner: false,
      isWritable: false,
    },
    // spl_token program
    {
      pubkey: programIds().token,
      isSigner: false,
      isWritable: false,
    },
    // system_program
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    // clock
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
