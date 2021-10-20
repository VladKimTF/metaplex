import React, { useState }  from 'react';
import { Row, Col } from 'antd';

import PackCard from './components/PackCard';

const MyPacks = () => {
  const [ openModal, setOpenModal ] = useState(true);
  const mockBlocks = Array.from({length: 4}, (v, i) => i);

  return (
    <div className="my-packs-view">
      <Row>
        <Col md={24}>
          <div className="my-packs-view__list">
            {
              mockBlocks.map((block, i) => (
                <PackCard value={i} onOpen={setOpenModal}/>
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyPacks

