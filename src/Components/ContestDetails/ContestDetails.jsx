import React, { useEffect, useState } from 'react';
import { Button, Tabs, notification } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import './styles.scss';
import Winnings from '../Winnings';
import Instructions from '../Instructions';
import Leaderboard from '../../pages/Leaderboard';
import axios from 'axios';
import { END_POINTS } from '../../api/domain';
import Loader from '../Loader/Loader';
import moment from 'moment';

const ContestDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    let contestList = useSelector((state) => state.ReducerFc?.contestList[0]);
    let balanceInfo = useSelector((state) => state.ReducerFc?.balance);
    const user = useSelector((state) => state.ReducerFc);
    const [contestData, setContestData] = useState(contestList?.find((item) => item._id == id));
    const [userBalance, setUserBalance] = useState();
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');
    const [loading, setloading] = useState(true)

    useEffect(() => {

        const contestData = contestList?.find((item) => item._id == id);
        setContestData(contestData);
        if (contestData) {
            setloading(false)
        }
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

        console.log("dataaaa,date", formattedDate, formattedTime)

    }, [contestData, contestList])

    useEffect(() => {
        if (balanceInfo) {
            setUserBalance(balanceInfo);
        }
    }, [balanceInfo])

    const items = [
        {
            key: '1',
            label: 'Winnings',
            children: <Winnings winnings={contestData?.winnings} />,
        },
        {
            key: '2',
            label: 'Leaderboard',
            children: <Leaderboard users={contestData && contestData.length > 0 ? contestData[0]?.users : []} />
        },
        {
            key: '3',
            label: 'Instructions',
            children: <Instructions />,
        },
    ];

    const handleJoinBtn = async () => {
        console.log("llll")
        const token = localStorage.getItem('token');
        if (token) {
            console.log("jjjjj", contestData, userBalance, user)
            localStorage.getItem("token")
            if (parseInt(userBalance) > parseInt(contestData?.price)) {
                const data = { contestId: contestData._id };
                console.log(contestData, "contestDatacontestData");
                try {
                    let joined = await axios.post(`${END_POINTS.joinContest}/${contestData._id}/${user?.userData[0]._id}`, {},
                        { headers: { authorization: token } })
                    if (joined) {
                        notification.info({ message: joined.data.message })
                    }
                } catch (error) {
                    console.log(error.response);
                    if (error?.response.data.message) {
                        notification.error({ message: error?.response.data.message })
                    }
                    else {

                        notification.error({ message: 'try again later' })
                    }

                }
                // /joincontest/:contestId/:userId
            } else {
                navigate("/wallet")
            }
        } else {
            navigate('/login')
        };
    };

    console.log(contestData, "contestdata");

    if (loading) {
        return <div className="contest-details__loader"><Loader /></div>
    }
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
                <button onClick={() => navigate(`/quize/${contestData._id}`)
                }>Start </button>
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
