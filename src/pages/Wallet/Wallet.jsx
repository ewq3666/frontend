import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiWallet3Line } from "react-icons/ri";
import { handlePayment } from '../../gateway/payment';
import "./styles.scss";

const Wallet = () => {
    const navigate = useNavigate();
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAmount, setIsAddAmount] = useState(false);
    const [isWithdrawRequest, setIsWithdrawRequest] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const addAmountFunction = (amount, Withdraw) => {
        setIsAddAmount(amount);
        setIsWithdrawRequest(Withdraw);
        setIsModalOpen(true);
    }

    const onFinish = (fieldValue) => {
        setIsBtnLoading(true);
        console.log("fieldValue", fieldValue)
        const amount = parseInt(fieldValue.amount);
        console.log("userInfo",userInfo)
        const handlePayment1 = handlePayment(amount,userInfo);
        console.log("handlePayment1",handlePayment1)
        setIsBtnLoading(false);
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
                        className="Withdraw-btn"
                        onClick={() => addAmountFunction(false, true)}
                    >
                        <span className='plus-icon'><FaRupeeSign /></span>
                        Withdrawal Amount
                    </Button>
                </div>
                <Divider dashed className='wallet-divider' />
            </div>
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
                                    <input type="number" placeholder='Enter amount' />
                                </Form.Item>
                                <div className="button-box">
                                    <Button htmlType="submit" className='common-blue-button' loading={isBtnLoading}>
                                        Add Amount
                                    </Button>
                                </div>
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
                            </div>
                            : ""
                    }
                </div>
            </Modal>
        </div>
    )
}

export default Wallet;