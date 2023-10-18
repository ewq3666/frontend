import React from 'react';
import { Button, Divider } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiWallet3Line } from "react-icons/ri";
import "./styles.scss";

const Wallet = () => {
    const navigate = useNavigate();

    return (
        <div className="wallet-container">
            <div className="common-title green-title">
                <div className='left-section'> <RiWallet3Line /></div>
                <h1>Wallet Section</h1>
                <div className='right-section' onClick={() => navigate('/')}> <IoMdClose /></div>
            </div>
            <div className="wallet-section-main-container">

                {/* Add Balence */}
                <div className="balence-box">
                    <h3>Current Balence:</h3>
                    <h3><FaRupeeSign /> 2000</h3>
                    <Button className="add-balence-btn"> <span className='plus-icon'>+</span>Add Amount</Button>
                </div>
                <Divider dashed className='wallet-divider'/>

                {/* Withdraw Amount */}
                <div className="balence-box withdrawal-box">
                    <h3>Available Amount for Withdrawal:</h3>
                    <h3><FaRupeeSign /> 2000</h3>
                    <Button className="add-balence-btn"> <span className='plus-icon'>+</span>Withdrawal Amount</Button>
                </div>
                <Divider dashed className='wallet-divider'/>
            </div>
        </div>
    )
}

export default Wallet;