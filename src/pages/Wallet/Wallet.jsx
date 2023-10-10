import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
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
            <div className="wallet-content">
                
            </div>
        </div>
    )
}

export default Wallet;