import React, { useState, useEffect } from 'react';
import { Card, Button, Progress } from 'antd';
import './contestcard.scss';
import { BsCurrencyRupee } from 'react-icons/bs';

const ContestCard = () => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${day}-${month}-${year}`;

  const [progress, setProgress] = useState(80)
  const twoColors = { '50%': '#108ee9', '100%': '#e31f77' };

  return (
    <div className="contest-card">
      <div className="contest-card__header-time-container">
        <p>{formattedDate}</p>
      </div>
      <div className="contest-card__header">
        <div className="contest-card__header-left">
          <span className='contest-card__header-title'>Prize Pool</span>
          <span className='contest-card__header-amount'><BsCurrencyRupee className='icon' />1000</span>
        </div>
        <div className="contest-card__header-right">
          <button >Join</button>
        </div>
      </div>
      <div className="contest-card__mid">
        <div className="contest-card__mid-category">
          <span>
            Category : NEET
          </span>
        </div>
        <div className="contest-card__mid-entryfee">
          <span>
            ENTRY FEE : <BsCurrencyRupee className='icon' />100
          </span>
        </div>
      </div>
      <div className="contest-card__bottom">
        <Progress
          className='progress-bar'
          percent={progress}
          showInfo={false}
          strokeColor={twoColors}
        />
        <div className="contest-card__bottom-title">
          <span className='title-first'><b>40</b> student left</span>
          <span className='title-second'><b>100</b> students</span>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
