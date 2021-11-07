import React from 'react';

const Card = ({ value, onClick }: { value: number; onClick: () => void }) => (
  <div key={value} className="pack-view__block" onClick={onClick}>
    <div className="pack-view__square">
      <span>{value + 1}</span>
    </div>
  </div>
);

export default Card;
