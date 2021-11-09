import React, { ReactElement, useState } from 'react';
import { Col, Modal, Row, Space, Spin } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
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
import { useWallet } from '@solana/wallet-adapter-react';
import { sendRequestCard } from './transactions/requestCard';
import { useUserVouchersByEdition } from '../../../artworks/hooks/useUserVouchersByEdition';

interface RedeemModalProps {
  isModalVisible: boolean;
  onClose: () => void;
}

enum openState {
  Ready,
  Finding,
  Found,
}

const RedeemModal = ({
  isModalVisible,
  onClose,
}: RedeemModalProps): ReactElement => {
  const { packs } = useMeta();
  const { packId, editionId }: { packId: string; editionId: string } =
    useParams();
  const wallet = useWallet();
  const connection = useConnection();
  const { accountByMint } = useUserAccounts();
  const userVouchers = useUserVouchersByEdition();
  const [modalState, setModalState] = useState<openState>(openState.Ready);

  const pack = packs[packId];
  const metadata = usePackMetadata({ packId });
  const numberOfNFTs = pack?.info?.packCards || 0;
  const numberOfAttempts = pack?.info?.allowedAmountToRedeem || 0;

  const handleClaim = async () => {
    setModalState(openState.Finding);
    if (!wallet.publicKey || !wallet || !userVouchers[editionId]) return;

    // const provingProcess = await findProvingProcessProgramAddress(
    //   toPublicKey(pack.pubkey),
    //   wallet.publicKey,
    // );

    const { pubkey, masterEdition, masterEditionMint, mint } =
      userVouchers[editionId];

    if (!mint) return;

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
      onCancel={modalState !== openState.Finding ? onClose : () => {}}
      footer={null}
      closable={modalState !== openState.Finding}
    >
      <div className="modal-redeem">
        {modalState === openState.Ready ? (
          <>
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
                <span>Open NFT</span>
              </button>
            </div>
          </>
        ) : (
          <div className="modal-redeem__body">
            <div className="finding-body">
              <Space direction="vertical">
                {modalState === openState.Finding ? (
                  <Spin
                    indicator={
                      <LoadingOutlined className="finding-body__spinner" spin />
                    }
                  />
                ) : (
                  <div className="finding-body__check">
                    <div className="icon-wrapper">
                      <CheckOutlined />
                    </div>
                  </div>
                )}
                <p className="finding-body__title">Finding your NFT</p>
                <p className="finding-body__desc">
                  NFTs are randomly distributed throughout
                  <br />
                  the totall supply.
                </p>
              </Space>
            </div>
            <Row className="finding-body__info">
              <Col span={3} className="finding-body__info__col center">
                <img src={'/wallet.svg'} style={{ height: 16 }} />
              </Col>
              <Col span={21} className="finding-body__info__col">
                You may also have to approve the purchase in your wallet if you
                don’t have “auto-approve” turned on.
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RedeemModal;
