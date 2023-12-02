import React, { useState, useEffect } from 'react';
import {  Spin } from 'antd';
import { ImTrophy } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from 'react-icons/bs';
import moment from 'moment';
import './contestcard.scss';

const ContestCard = (props) => {
  const navigate = useNavigate();
  const [contestData, setContestData] = useState([]);
  const [contestTimer, setContestTimer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Featch contest data
  useEffect(() => {
    setContestData(props.contestData);
    setIsLoading(props.isLoading)
  }, [props.contestData,props.isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      const updatedContestTimer = contestData.map((contest) => {
        const targetDateTime = moment(`${contest.date} ${contest.time}`, 'YYYY-MM-DD HH:mm A');
        const duration = moment.duration(targetDateTime.diff(currentTime));
        const daysDiff = duration.days();
        const hoursDiff = duration.hours();
        const minutesDiff = duration.minutes();
        const secondsDiff = duration.seconds();
        return {
          days: daysDiff,
          hours: hoursDiff,
          minutes: minutesDiff,
          seconds: secondsDiff,
          time: contest.time
        };
      });
      setContestTimer(updatedContestTimer);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [contestData]);

  const Countdown = ({ days, hours, minutes, seconds, index }) => {
    const contest = contestData[index]; // Get the specific contest data
    let diff = null;

    if (contest) {
      const contestDate = moment(contest.date).format('YYYY-MM-DD');
      const customDate = moment(contestDate);
      const today = moment().format('YYYY-MM-DD');
      diff = customDate.diff(today, 'days');
    }

    if (diff === 1) {
      return <p>Tomorrow</p>;
    } else if (diff > 1) {
      const formatted = moment(contest.date).format("DD MMM yyyy");
      return <p>{formatted}</p>;
    } else if (days > 0) {
      return <p>{days}d {hours}h {minutes}m {seconds}s</p>;
    } else if (hours > 0) {
      return <p>{hours}h {minutes}m {seconds}s</p>;
    } else if (minutes > 0) {
      return <p>{minutes}m {seconds}s</p>;
    } else {
      return <p>{seconds}s</p>;
    }
  };

  return (
    <>
      {isLoading ?
        <Spin size="large" className='contest-spin' />
        :
        <>
          {contestTimer?.length > 0 ? (
            <>
              {contestData.map((values, index) => {
                // Calculate the total seconds remaining
                const totalSeconds = (contestTimer[index]?.days * 24 * 60 * 60) +
                  (contestTimer[index]?.hours * 60 * 60) +
                  (contestTimer[index]?.minutes * 60) +
                  contestTimer[index]?.seconds;
                return (
                  <div className="contest-card" key={index} onClick={() => totalSeconds <= 0 ? navigate(`/contest-details/${values._id}`) : navigate(`/contest-details/${values._id}`)}>
                    <div className="contest-card__header">
                      <div className="contest-card__header-category">
                        <span>
                         {values.name}
                        </span>
                      </div>
                      <div className="contest-card__header-entryfee">
                        <span>
                          Entry: <BsCurrencyRupee className='icon' />{values.price}
                        </span>
                      </div>
                    </div>
                    <div className="contest-card__bottom-left">
                        <span className='contest-card__bottom-left__title'>Prize Pool: </span>
                        <span className='contest-card__bottom-left__amount'> <BsCurrencyRupee className='icon' />5000</span>
                      </div>
                    <div className="contest-card__mid">
                      {totalSeconds <= 0 ? (
                        <p className='countdown-box countdown-box-completed'>Completed</p>
                      ) : (
                        <p className='countdown-box'>
                          <Countdown
                            days={contestTimer[index]?.days}
                            hours={contestTimer[index]?.hours}
                            minutes={contestTimer[index]?.minutes}
                            seconds={contestTimer[index]?.seconds}
                            index={index}
                          />
                        </p>
                      )}
                      <p className='custom-time'>{moment(values.time, 'HH:mm A').format("h:mm A")}</p>

                    </div>
                    <div className="contest-card__bottom">
                        <div className='winning-percentage'>
                          <ImTrophy/>
                          <span>70%</span>
                        </div>
                        <div className="total-seats">
                          Total seats : 200
                        </div>
                    </div>
                  </div>
                )
              })}
            </>
          ) : "No data."}
        </>
      }
    </>
  );
};

export default ContestCard;
