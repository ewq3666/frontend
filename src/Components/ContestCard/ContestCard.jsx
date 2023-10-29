import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Result } from 'antd';
import './contestcard.scss';
import { BsCurrencyRupee } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import { END_POINTS } from '../../api/domain';
import { useNavigate } from "react-router-dom";

const ContestCard = () => {

  const navigate = useNavigate();
  const [contestData, setContestData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINTS.contest);
        setContestData(response.data);
        // console.log(response.data, "contest data");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [progress, setProgress] = useState(80)
  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState({})

  const currentTime = moment();
  const targetDateTime = moment('2023-11-12 11:30 PM', 'YYYY-MM-DD HH:mm A');
  // const targetDateTime = moment(`${contestData.date} ${contestData.time}`, 'YYYY-MM-DD HH:mm A');

  const duration = moment.duration(targetDateTime.diff(currentTime));

  const daysDiff = duration.days();
  const hoursDiff = duration.hours();
  const minutesDiff = duration.minutes();
  const secondsDiff = duration.seconds();

  useEffect(() => {
    const timer = setInterval(() => {
      setResult({
        days: daysDiff,
        hours: hoursDiff,
        minutes: minutesDiff,
        seconds: secondsDiff
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleJoinBtn = () => {

    const token = localStorage.getItem('token');
    // console.log(token, "hey iam toekn");
    if (!token) navigate('/login');
    navigate('/quize')

  };

  return (
    <>
      {result.hours > 0 || result.minutes > 0 || result.seconds > 0 ? (
        <>
          {contestData.result?.map((values, index) => {
            return (
              <div className="contest-card" key={index}>
                <div className="contest-card__header">
                  <div className="contest-card__header-left">
                    <span className='contest-card__header-left__title'>Prize Pool</span>
                    <span className='contest-card__header-left__amount'><BsCurrencyRupee className='icon' />{values.price}</span>
                  </div>
                  <div className="contest-card__header-mid">
                    <p className='countdown-box'>
                      {result.days === 1 ? (
                        <p>Tomorrow</p>
                      ) : result.days > 1 ? (
                        <p>{targetDateTime.format('DDMMM')}</p>
                      ) : result.days > 0 ? (
                        <p> {result.days}d {result.hours}h {result.minutes}m {result.seconds}s</p>
                      ) : result.hours > 0 ? (
                        <p>{result.hours}h {result.minutes}m {result.seconds}s</p>
                      ) : (
                        <p>{result.minutes}m {result.seconds}s</p>
                      )}
                    </p>
                    <p className='custom-time'>{targetDateTime.format('h:mm A')}</p>
                  </div>
                  <div className="contest-card__header-right">
                    <button
                      onClick={handleJoinBtn}
                      className="join-button"
                    >Join
                    </button>
                  </div>
                </div>
                <div className="contest-card__mid">
                  <div className="contest-card__mid-category">
                    <span>
                      Category : {values.name}
                    </span>
                  </div>
                  <div className="contest-card__mid-entryfee">
                    <span>
                      ENTRY FEE : <BsCurrencyRupee className='icon' />{values.entryFee}
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
          })
          }
        </>
      ) : ""}
    </>
  );
};

export default ContestCard;
