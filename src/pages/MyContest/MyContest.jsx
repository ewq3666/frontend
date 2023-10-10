import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import "./styles.scss";

const MyContest = () => {
    const navigate = useNavigate();

    return (
        <div className="wallet-container">
            <div className="common-title red-title">
                <div className='left-section'> <IoGameControllerOutline /></div>
                <h1>My Contest</h1>
                <div className='right-section' onClick={() => navigate('/')}> <IoMdClose /></div>
            </div>
            <div className="wallet-content">
                
            </div>
        </div>
    )
}

export default MyContest;