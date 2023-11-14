import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import './styles.scss';
import Winnings from '../Winnings';
import Instructions from '../Instructions';
import Leaderboard from '../../pages/Leaderboard';

const ContestDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    let contestList = useSelector((state) => state.ReducerFc?.contestList[0]);
    let balanceInfo = useSelector((state) => state.ReducerFc?.balance);
    const [contestData, setContestData] = useState({});
    const [userBalance, setUserBalance] = useState();
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const contestData = contestList?.find((item) => item._id == id);
        setContestData(contestData);
        // console.log("contestData", contestData)
        // const dateString = '2023-10-04T00:00:00.000Z';
        const dateObject = new Date(contestData?.date);
      
        // Formatting date
        setFormattedDate(`${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`);
      
        // Formatting time
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        setFormattedTime(`${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${amOrPm}`);
      
        console.log("dataaaa,date",formattedDate,formattedTime)
    }, [])

    useEffect(() => {
        if(balanceInfo) {
            setUserBalance(balanceInfo);
        }
    }, [balanceInfo])



    const items = [
        {
            key: '1',
            label: 'Winnings',
            children: <Winnings/>,
        },
        {
            key: '2',
            label: 'Leaderboard',
            children: <Leaderboard/>,
        },
        {
            key: '3',
            label: 'Instructions',
            children: <Instructions/>,
        },
    ];

    const handleJoinBtn = () => {
        console.log("llll")
        const token = localStorage.getItem('token');
        if (token) { 
            console.log("jjjjj",contestData)
            if(userBalance >= contestData.price) {
                navigate("/quize") 
            } else {
                navigate("/wallet") 
            }
        } else {
            navigate('/login')
        };
      };

    return (
        <div className="contest-details">
            <div className="contest-details__card">
                <div className="contest-details__card-top">
                    <div className="contest-category">
                        <span>Category: </span>
                        {contestData?.name}
                    </div>
                    <div className="contest-date">
                        <span>Date: </span>
                        {formattedDate}
                    </div>
                    <div className="contest-time">
                        <span>Time: </span>
                        {formattedTime}
                    </div>
                </div>
                <div className="contest-details__card-middle">
                    <span>Price Poll : <FaRupeeSign />5000</span>
                    <span>Entry Fees: <FaRupeeSign />{contestData?.price}</span>
                </div>
                <div className="contest-details__card-bottom">
                <div className="button-box">
                        <Button
                            className="common-blue-btn add-money-button"
                            onClick={handleJoinBtn}
                        >
                            Join Contest
                        </Button>
                    </div>
                </div>
            </div>
            <div className="contest-details__tab-section">
                <Tabs 
                    defaultActiveKey="1" 
                    items={items} 
                    className='contest-details__tab-section-tab'
                />
            </div>
            <>{console.log("contestList", contestList)}</>
        </div>
    );
};

export default ContestDetails;
