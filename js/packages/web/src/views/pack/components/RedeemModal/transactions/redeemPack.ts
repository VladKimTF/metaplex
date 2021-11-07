import { Keypair, TransactionInstruction } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { claimPack } from '@oyster/common/dist/lib/models/packs/instructions/claimPack';

import { RedeemPackParams } from './interface';
import { getNewMint } from './getNewMint';

export const generateRedeemPackInstructions = async ({
  wallet,
  connection,
  index,
  packSetKey,
  voucherToken,
  userToken,
  metadataMint,
  edition,
}: RedeemPackParams): Promise<{
  instructions: TransactionInstruction[][];
  signers: Keypair[][];
}> => {
  if (!wallet.publicKey) throw new WalletNotConnectedError();

  const walletPublicKey = wallet.publicKey;

  const {
    mint: newMint,
    instructions: newMintInstructions,
    signers: newMintSigners,
  } = await getNewMint(wallet, connection);

  const claimPackInstruction = await claimPack({
    index,
    packSetKey,
    wallet: walletPublicKey,
    voucherToken: voucherToken.pubkey,
    userToken: userToken.pubkey,
    newMint,
    metadataMint,
    edition,
  });

  return {
    instructions: [newMintInstructions, [claimPackInstruction]],
    signers: [newMintSigners, []],
  };
};

// export const sendRedeemPack = async ({
//   wallet,
//   connection,
//   accountByMint,
//   data,
// }: RedeemPackParams) => {
//   const { instructions, signers } = await generateRedeemPackInstructions({
//     wallet,
//     connection,
//     accountByMint,
//     data,
//   });

//   return sendTransactions(
//     connection,
//     wallet,
//     instructions,
//     signers,
//     SequenceType.Sequential,
//   );
// };
