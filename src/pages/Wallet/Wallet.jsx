import React, { useState } from 'react';
import axios from "axios";
import { Button, Divider, Form, Input, Modal } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiWallet3Line } from "react-icons/ri";
import "./styles.scss";
import { handlePayment } from '../../gateway/payment';

const Wallet = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAmount, setIsAddAmount] = useState(false);
    const [isWithdrawRequest, setIsWithdrawRequest] = useState(false);

    // const [book, setBook] = useState({
    //     name: "The Fault In Our Stars",
    //     author: "John Green",
    //     img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    //     price: 250,
    // });

    const addAmountFunction = (amount, Withdraw) => {
        setIsAddAmount(amount);
        setIsWithdrawRequest(Withdraw);
        setIsModalOpen(true);
    }

    const onFinish = (fieldValue) => {
        console.log("fieldValue", fieldValue)
        const amount = parseInt(fieldValue.amount);
        handlePayment(amount);
    }

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
                    <Button
                        className="add-balence-btn"
                        onClick={() => addAmountFunction(true, false)}
                    >
                        <span className='plus-icon'>+</span>
                        Add Amount
                    </Button>
                </div>
                <Divider dashed className='wallet-divider' />

                {/* Withdraw Amount */}
                <div className="balence-box withdrawal-box">
                    <h3>Available Amount for Withdrawal:</h3>
                    <h3><FaRupeeSign /> 2000</h3>
                    <Button
                        className="add-balence-btn"
                        onClick={() => addAmountFunction(false, true)}
                    >
                        <span className='plus-icon'><FaRupeeSign /></span>
                        Withdrawal Amount
                    </Button>
                </div>
                <Divider dashed className='wallet-divider' />

                <Modal
                    title={isAddAmount ? "Add Amount" : isWithdrawRequest ? "Withdrawal Request" : ""}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    className='add-amount-modal'
                >
                    <div className="add-amount-box">
                        {isAddAmount ?
                            <div className="add-amount-form">
                                <Form
                                    name="amountForm"
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Add credit to your account to play more quizzes:"
                                        name="amount"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter amount',
                                            },
                                        ]}
                                        className='common-input'
                                    >
                                        <input type="number" placeholder='Enter amount'/>
                                    </Form.Item>
                                    <div className="button-box">
                                        <Button htmlType="submit" className='common-blue-button'>
                                            Add Amount
                                        </Button>
                                    </div>
                                    {/* <div className="button-box">
                                        <Button className='common-empty-button' onClick={() => setemailSent(false)}>
                                            Cancel
                                        </Button>
                                    </div> */}
                                </Form>
                            </div>
                            : isWithdrawRequest ?
                                <div className='withdrawal-request'>
                                    <p>You're just one step away from cashing in your earnings! Please complete the withdrawal request form, and we'll process your funds shortly</p>
                                    <div className="button-box">
                                        <Button htmlType="submit" className='common-yellow-button' >
                                            Request For Withdrawal
                                        </Button>
                                    </div>
                                    {/* <div className="button-box">
                                        <Button className='common-empty-button' onClick={() => setemailSent(false)}>
                                            Cancel
                                        </Button>
                                    </div> */}
                                </div>
                                : ""
                        }
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Wallet;