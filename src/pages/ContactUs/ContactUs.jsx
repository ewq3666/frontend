import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdOutlineAttachEmail } from "react-icons/md";
import "./styles.scss";

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="wallet-container">
            <div className="common-title red-title">
                <div className='left-section'> <MdOutlineAttachEmail /></div>
                <h1>Contact Us</h1>
                <div className='right-section' onClick={() => navigate('/')}> <IoMdClose /></div>
            </div>
            <div className="wallet-content">
                
            </div>
        </div>
    )
}

export default ContactUs;