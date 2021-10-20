import React  from 'react';

const PackCard = ({ value, onOpen }) => (
  <div
    key={value}
    className="my-pack__card"
    onClick={() => onOpen(true)}
  >

    <div className="my-pack__body">
      <div className="my-pack__header">
        <div></div>
        <div className="count">
          <span>1 of 200</span>
        </div>
      </div>
      <div className="my-pack__square">
        <div className="my-pack__square-image">
          <div className="my-pack__first-back" />
          <div className="my-pack__second-back" />

          <div className="my-pack__img-wr">
            <img src={'/img/banner1.jpeg'} alt={'name'}/>
          </div>


          <div className="my-pack__status">
            2/5 opened
          </div>
        </div>
      </div>

      <p className="my-pack__body-title">fiasco</p>

      <div className="my-pack__footer-main-block">
        <div className="info">
          <p>PURCHASED</p>
          <p className="date">Sep 28 2021</p>
        </div>

        <div className="image">
          <img src={'/sol-circle.svg'} alt={'name'}/>
        </div>
      </div>

    </div>
    <div className="my-pack__footer">
      <div className="my-pack__footer-image">
        <img src={'/sol-circle.svg'} alt={'name'}/>
      </div>

      <div className="info__text">
        <p className="info__title">{'1 SOL'}</p>
        <p>{'$133.30'}</p>
      </div>
    </div>
  </div>
)

export default PackCard;
