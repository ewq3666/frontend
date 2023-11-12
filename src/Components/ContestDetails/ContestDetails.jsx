import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import './styles.scss';

const ContestDetails = () => {
    const { id } = useParams();
    let contestList = useSelector((state) => state.ReducerFc?.contestList[0]);
    const [contestData, setContestData] = useState({});

    useEffect(() => {
        const contestData = contestList?.find((item) => item._id == id);
        setContestData(contestData);
        console.log("contestData", contestData)
    }, [])

    const items = [
        {
            key: '1',
            label: 'Winnings',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Leaderboard',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Instructions',
            children: 'Content of Tab Pane 3',
        },
    ];

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
                        12/11/2023 
                    </div>
                    <div className="contest-time">
                        <span>Time: </span>
                        {contestData?.time}
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
