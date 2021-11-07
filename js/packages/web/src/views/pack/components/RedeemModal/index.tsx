import React, { ReactElement } from 'react';
import { Modal } from 'antd';
import { useParams } from 'react-router';
import {
  getMetadata,
  toPublicKey,
  useConnection,
  useMeta,
  useUserAccounts,
  Wallet,
} from '@oyster/common';
import { findProvingProcessProgramAddress } from '@oyster/common/dist/lib/models/packs/find';
import {
  getProvingProcessByPubkey,
  getProvingProcessByVoucherMint,
} from '@oyster/common/dist/lib/models/packs/accounts/ProvingProcess';

import RedeemCard from './components/RedeemCard';
import { usePackMetadata } from './hooks/usePackMetadata';
import { useUserArts } from '../../../../hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendRequestCard } from './transactions/requestCard';
import { useUserVouchersByEdition } from '../../../artworks/hooks/useUserVouchersByEdition';

interface RedeemModalProps {
  isModalVisible: boolean;
  onClose: () => void;
}

const RedeemModal = ({
  isModalVisible,
  onClose,
}: RedeemModalProps): ReactElement => {
  const { packs, vouchers, metadataByMint } = useMeta();
  const { packId, editionId }: { packId: string; editionId: string } =
    useParams();
  const wallet = useWallet();
  const connection = useConnection();
  const { accountByMint } = useUserAccounts();
  const userVouchers = useUserVouchersByEdition();

  const pack = packs[packId];
  const metadata = usePackMetadata({ packId });
  const ownedMetadata = useUserArts();
  const numberOfNFTs = pack?.info?.packCards || 0;
  const numberOfAttempts = pack?.info?.allowedAmountToRedeem || 0;

  // const voucherMetadata = ownedMetadata.find(
  //   metadata => metadata.edition?.pubkey === editionId,
  // );
  // const voucher = Object.values(vouchers).find(
  //   voucher => voucher.info.packSet === pack.pubkey,
  // );

  const handleClaim = async () => {
    if (!wallet.publicKey || !wallet) return;

    // const provingProcess = await findProvingProcessProgramAddress(
    //   toPublicKey(pack.pubkey),
    //   wallet.publicKey,
    // );

    const { pubkey, masterEdition, masterEditionMint, mint } =
      userVouchers[editionId];

    const voucherTokenAccount = accountByMint.get(mint);

    if (!voucherTokenAccount?.pubkey) return;

    const status = await sendRequestCard({
      connection,
      index: 1,
      packSetKey: pack.pubkey,
      edition: masterEdition,
      editionMint: masterEditionMint,
      tokenAccount: voucherTokenAccount.pubkey,
      packVoucher: pubkey,
      wallet,
    });

    const provingProcessData3 = await getProvingProcessByVoucherMint({
      connection,
      mintPubKey: toPublicKey(mint),
    });

    console.log(status, provingProcessData3);
  };

  return (
    <Modal
      className="modal-redeem-wr"
      centered
      width={500}
      mask={false}
      visible={isModalVisible}
      onCancel={onClose}
      footer={null}
    >
      <div className="modal-redeem">
        <div>
          <p className="modal-redeem__title">Claim an NFT</p>
        </div>
        <div className="modal-redeem__body">
          <p className="body-title">Pack of {numberOfNFTs}</p>
          <p className="body-desc">
            Your NFT pack from Street Dreams grants you {numberOfAttempts}{' '}
            chances to own any of the following collectibles.
          </p>

          <div className="modal-redeem__cards">
            <p>POTENTIAL NFTs</p>
            {metadata?.map(
              item => item && <RedeemCard key={item.pubkey} item={item} />,
            )}
          </div>

          <p className="general-desc">
            Once opened, a Pack cannot be resealed.
          </p>

          <button className="modal-redeem__open-nft" onClick={handleClaim}>
            <span>Open first NFT</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RedeemModal;
