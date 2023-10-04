import React from 'react';
import { IoMdClose } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import "./styles.scss";

const Transaction = () => {
    const navigate = useNavigate();

    const arr = [
        {
            transactionId: 1,
            type: "whithdrawal",
            amount: 1000,
            date: "2/2/2002",
        },
        {
            transactionId: 2,
            type: "deposite",
            amount: 100,
            date: "21/3/2002",
        },
        {
            transactionId: 3,
            type: "deposite",
            amount: 100,
            date: "15/3/2002",
        },
        {
            transactionId: 4,
            type: "whithdrawal",
            amount: 1100,
            date: "5/3/2002",
        },
        {
            transactionId: 5,
            type: "deposite",
            amount: 100,
            date: "2/2/2002",
        },
    ]

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className="transaction-container">
            <div className="transaction-content">
                <div className="transaction-title">
                    <div className='left-section'> <BsBank2 /></div>
                    <h1>Transaction</h1>
                    <div className='right-section' onClick={goBack}> <IoMdClose /></div>
                </div>
                <div className="transaction-section-main-container">
                    <div className="balence-box">
                        <h3>Total Balence:</h3>
                        <h3><FaRupeeSign /> 2000</h3>
                    </div>
                    <div className="transaction-history">
                        <h4>Transaction History:</h4>
                        <div className="transaction-table">
                            {arr.map((data, index) => {
                                return (
                                    <div className="Transaction-row" key={index}>
                                        <p>
                                            <span>Transaction type: {data.type}</span>
                                            <span>Date: {data.date}</span>
                                        </p>
                                        <p>
                                            <span>Total Amount: </span>
                                            <span>{data.amount}</span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;