import React, { useCallback, useState } from 'react';
import { Row, Col } from 'antd';

import Card from './components/Card';
import RedeemModal from './components/RedeemModal';
import PackSidebar from './components/PackSidebar';
import { useMeta } from '@oyster/common';
import { useParams } from 'react-router';

export const PackView = () => {
  const [openModal, setOpenModal] = useState(false);
  const { packId }: { packId: string } = useParams();
  const { packs } = useMeta();
  const pack = packs[packId];

  const total = pack?.info?.packCards || 0;
  const mockBlocks = Array.from({ length: total }, (v, i) => i);

  const handleCardClick = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  return (
    <div className="pack-view">
      <Row>
        <Col md={16}>
          <div className="pack-view__list">
            {mockBlocks.map((block, i) => (
              <Card key={i} value={i} onClick={handleCardClick} />
            ))}
          </div>
        </Col>
        <Col md={8}>
          <PackSidebar pack={pack} />
        </Col>
      </Row>

      <RedeemModal
        isModalVisible={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};
