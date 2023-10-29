import React, { useState, useEffect } from 'react';
import { Card, Button, Progress } from 'antd';
import './contestcard.scss';
import { BsCurrencyRupee } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from "react-router-dom";

const ContestCard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(80);
  const [contestData, setContestData] = useState([]);
  console.log(contestData, "data is this");

  const [contestTimer, setContestTimer] = useState([]);
  console.log(contestTimer, "time diff");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINTS.contest);
        setContestData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      const updatedContestTimer = contestData.result?.map((contest) => {
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
    if (days === 1) {
      return <p>Tomorrow</p>;
    } else if (days > 1) {
      const formatted = moment(contestData.result[index].date).format("DDMMM");
      return <p>{formatted}</p>;
    } else if (days > 0) {
      return <p>{days}d {hours}h {minutes}m {seconds}s</p>;
    } else if (hours > 0) {
      return <p>{hours}h {minutes}m {seconds}s</p>;
    } else {
      return <p>{minutes}m {seconds}s</p>;
    }
  };

  const handleJoinBtn = () => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  };

  return (
    <>
      {contestTimer.length > 0 ? (
        <>
          {contestData.result?.map((values, index) => {
            // Calculate the total seconds remaining
            const totalSeconds = (contestTimer[index].days * 24 * 60 * 60) + 
              (contestTimer[index].hours * 60 * 60) + 
              (contestTimer[index].minutes * 60) + 
              contestTimer[index].seconds;
            
            return (
              <div className="contest-card" key={index}>
                <div className="contest-card__header">
                  <div className="contest-card__header-left">
                    <span className='contest-card__header-left__title'>Prize Pool</span>
                    <span className='contest-card__header-left__amount'><BsCurrencyRupee className='icon' />{values.price}</span>
                  </div>
                  <div className="contest-card__header-mid">
                    {totalSeconds <= 0 ? (
                      <p>Completed</p>
                    ) : (
                      <p className='countdown-box'>
                        <Countdown
                          days={contestTimer[index].days}
                          hours={contestTimer[index].hours}
                          minutes={contestTimer[index].minutes}
                          seconds={contestTimer[index].seconds}
                          index={index}
                        />
                      </p>
                    )}
                    <p className='custom-time'>{moment(values.time, 'HH:mm A').format("h:mm A")}</p>
                  </div>
                  <div className="contest-card__header-right">
                    {totalSeconds <= 0 ? (
                      <button disabled>Completed</button>
                    ) : (
                      <button
                        onClick={handleJoinBtn}
                        className="join-button"
                      >Join
                      </button>
                    )}
                  </div>
                </div>
                <div className="contest-card__mid">
                  <div className="contest-card__mid-category">
                    <span>
                      Category: {values.name}
                    </span>
                  </div>
                  <div className="contest-card__mid-entryfee">
                    <span>
                      ENTRY FEE: <BsCurrencyRupee className='icon' />{values.entryFee}
                    </span>
                  </div>
                </div>
                <div className="contest-card__bottom">
                  <Progress
                    className='progress-bar'
                    percent={progress}
                    showInfo={false}
                    strokeColor={{ '50%': '#108ee9', '100%': '#e31f77' }}
                  />
                  <div className="contest-card__bottom-title">
                    <span className='title-first'><b>{values.joinStudents} student left</b> </span>
                    <span className='title-second'><b>{values.students} students</b></span>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      ) : <h1>Join Next Contest</h1>}
    </>
  );
};

export default ContestCard;
