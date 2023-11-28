import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import { Tabs } from 'antd';
import "./styles.scss";
import Withdraw from './WithdrawTransaction/Withdraw';
import AddMoney from './AddMoneyTransaction/AddMoney';
import { useSelector } from 'react-redux';

const Transaction = () => {
    let balenceInfo = useSelector((state) => state.ReducerFc?.balance);
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: 'Withdraw',
            children: <Withdraw />,
        },
        {
            key: '2',
            label: 'deposit',
            children: <AddMoney />,
        },
    ];

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className="transaction-container">
            <div className="transaction-content">
                <div className="common-title green-title">
                    <div className='left-section'> <BsBank2 /></div>
                    <h1>Transaction</h1>
                    <div className='right-section' onClick={goBack}> <IoMdClose /></div>
                </div>
                <div className="transaction-section-main-container">
                    <div className="balence-box">
                        <h3>Total Balance:</h3>
                        <h3><FaRupeeSign /> {balenceInfo?.length > 0 ? balenceInfo : "0"}</h3>
                    </div>
                    <div className="transaction-history">
                        <h4>Transaction History</h4>
                        <div className="contest-details__tab-section">
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                className='contest-details__tab-section-tab'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;