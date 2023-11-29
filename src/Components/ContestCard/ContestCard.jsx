import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from 'react-icons/bs';
import moment from 'moment';
import './contestcard.scss';

const ContestCard = (props) => {

  const navigate = useNavigate();
  const [contestTimer, setContestTimer] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      const updatedContestTimer = props.contestData.map((contest) => {
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
  }, [props.contestData]);

  const Countdown = ({ days, hours, minutes, seconds, index }) => {
    const contest = props.contestData[index]; // Get the specific contest data
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
      const formatted = moment(contest.date).format("DDMMM");
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
      {props.isLoading ?
        <Spin size="large" className='contest-spin' />
        :
        <>
          {contestTimer?.length > 0 ? (
            <>
              {props.contestData.map((values, index) => {
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
                          Category: {values.name}
                        </span>
                      </div>
                      <div className="contest-card__header-entryfee">
                        <span>
                          Joinning: <BsCurrencyRupee className='icon' />{values.price}
                        </span>
                      </div>
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
                      {/* <Progress
                    className='progress-bar'
                    percent={progress}
                    showInfo={false}
                    strokeColor={{ '50%': '#108ee9', '100%': '#e31f77' }}
                  />
                  <div className="contest-card__bottom-title">
                    <span className='title-first'><b>{values.joinStudents} student left</b> </span>
                    <span className='title-second'><b>{values.students} students</b></span>
                  </div> */}

                      <div className="contest-card__bottom-left">
                        <span className='contest-card__bottom-left__title'>Prize Pool</span>
                        <span className='contest-card__bottom-left__amount'><BsCurrencyRupee className='icon' />5000</span>
                      </div>
                      <div className="contest-card__bottom-right">
                        <p className='contest-date'>Date: {moment(values.date).format('DD-MM-YYYY')}</p>
                        {totalSeconds <= 0 ? (
                          <div className="button-box">
                            <Button
                              className="common-blue-btn add-money-button completed-btn"
                            >
                              Completed
                            </Button>
                          </div>
                        ) : (
                          <div className="button-box">
                            <Button
                              className="common-blue-btn add-money-button"
                            >
                              Join Contest
                            </Button>
                          </div>
                        )}
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
