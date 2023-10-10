import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Result } from 'antd';
import './contestcard.scss';
import { BsCurrencyRupee } from 'react-icons/bs';
import moment from 'moment';
const ContestCard = () => {

  const [progress, setProgress] = useState(80)
  const twoColors = { '50%': '#108ee9', '100%': '#e31f77' };

  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState({})
  const [showCount, setShowCount] = useState(false)

  console.log(result);
  const currentTime = moment();
  const customTime = moment('11:50 PM', 'h:mm A');
  const duration = moment.duration(customTime.diff(currentTime));
  const hoursDiff = duration.hours();
  const minutesDiff = duration.minutes();
  const secondsDiff = duration.seconds();
  useEffect(() => {
    const timer = setInterval(() => {
      setResult({ hours: hoursDiff, minutes: minutesDiff, seconds: secondsDiff });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [customTime]);

  const handleCount = () => {
    setShowCount(true);
    setIsDisabled(true);
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <>
      {result.hours > 0 || result.minutes > 0 || result.seconds > 0 ? (
        <>
          <div className="contest-card">
            <div className="contest-card__header">
              <div className="contest-card__header-left">
                <span className='contest-card__header-left__title'>Prize Pool</span>
                <span className='contest-card__header-left__amount'><BsCurrencyRupee className='icon' />1000</span>
              </div>
              {showCount ?
                <>
                  <div className="contest-card__header-mid">
                    <p className='countdown-box'>
                      {showCount ? result.hours > 0 ? (
                        <p>{result.hours}h {result.minutes}m {result.seconds}s</p>
                      ) : (
                        <p>{result.minutes}m {result.seconds}s</p>
                      ) : ""}
                    </p>
                    <p className='custom-time'>{customTime.format('h:mm A')}</p>
                  </div>
                </>
                : ""
              }
              <div className="contest-card__header-right">
                <button
                  onClick={handleCount}
                  className={`join-button ${isDisabled ? 'disabled' : ''}`}
                  disabled={isDisabled}>Join
                </button>
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
        </>
      ) : "join next contest"}
    </>
  );
};

export default ContestCard;
