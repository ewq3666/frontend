import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { ClockCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import './styles.scss';

const ContestCard = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateCountdown = () => {
    const targetDate = new Date('2023-01-10T00:00:00Z');
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="contest-card">
      <div className="contest-card-header">
        <div className="contest-card-date">
          <p className="date-text">1/10/2023</p>
        </div>
        <div className="contest-card-category">
          <p>Category: Neet</p>
        </div>
      </div>
      <div className="contest-card-content">
        <h2 className="title-text">Contest Title</h2>
        <p className="countdown-text">
          <ClockCircleOutlined className="countdown-icon" />
          <span className="countdown-value">
            {countdown.days > 0 && `${countdown.days}d `}
            {countdown.hours > 0 && `${countdown.hours}h `}
            {countdown.minutes > 0 && `${countdown.minutes}m `}
            {countdown.seconds > 0 && `${countdown.seconds}s`}
          </span>
        </p>
        <p className="price-text">
          <DollarCircleOutlined className="price-icon" />
          Price: <span className="price-value">1000</span>
        </p>
      </div>
      <div className="contest-card-footer">
        <Button type="primary" className="join-button">
          Join
        </Button>
        <div className="entry-fees">
          <p className="fees-text">Entry Fees</p>
          <p className="fees-value">100</p>
        </div>
      </div>
    </Card>
  );
};

export default ContestCard;
