import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, Form, Input, Modal, notification } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiWallet3Line } from "react-icons/ri";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { handlePayment } from '../../gateway/payment';
import "./styles.scss";
import axios from "axios"
import { END_POINTS } from '../../api/domain';

const Wallet = () => {
    const navigate = useNavigate();
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    let balenceInfo = useSelector((state) => state.ReducerFc?.balance);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAmount, setIsAddAmount] = useState(false);
    const [isWithdrawRequest, setIsWithdrawRequest] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const user = useSelector((state) => state.ReducerFc)
    console.log(user, "user")
    const addAmountFunction = (amount, Withdraw) => {
        setIsAddAmount(amount);
        setIsWithdrawRequest(Withdraw);
        setIsModalOpen(true);
    }

    const onFinish = async (fieldValue) => {
        try {
            setIsBtnLoading(true);
            const amount = parseInt(fieldValue.amount);
            handlePayment(amount, userInfo);
            setIsBtnLoading(false);
            setIsAddAmount(false);
            setIsWithdrawRequest(false);
            setIsModalOpen(false);
        } catch (error) {
            console.log("catch error")
        }
    }

    // Validation function to check if the value is at least 50
    const validateAmount = (_, value) => {
        if (value >= 50) {
            return Promise.resolve();
        }
        return Promise.reject('Amount must be at least 50 rupees');
    };
    const token = localStorage.getItem('token');

    const requestWithdrawal = async () => {
        try {
            await axios.post(`${END_POINTS.widthdrawRequest}`,
                {
                    userId: user.userData[0]._id,
                    amount: balenceInfo,
                    username: user.userData[0].name
                },
                { headers: { authorization: token } }
            ).then((res)=>console.log(res))
        } catch (error) {
            console.log(error,"error");
            if (error.response.data.alreadyRequsted) {
                notification.error({ message: error.response.data.message })
            }
            if (error.response.data) {
                
                notification.error({ message: error.response.data.message })
            }
        }
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
                    <h3><FaRupeeSign /> {balenceInfo}</h3>
                    <div className="button-box">
                        <Button
                            className="common-blue-btn"
                            onClick={() => addAmountFunction(true, false)}
                        >
                            <span className='plus-icon'>+</span>
                            Add Amount
                        </Button>
                    </div>
                </div>
                <Divider dashed className='wallet-divider' />

                {/* Withdraw Amount */}
                <div className="balence-box withdrawal-box">
                    <h3>Available Amount for Withdrawal:</h3>
                    <h3><FaRupeeSign /> {balenceInfo}</h3>
                    <div className="button-box">
                        <Button
                            className="common-blue-btn add-money-button"
                            onClick={() => addAmountFunction(false, true)}
                        >
                            <span className='withdrawal-svg'><FaRupeeSign /></span>
                            Withdrawal Amount
                        </Button>
                    </div>
                </div>
                <p className="withdrawal-note">
                    NOTE: Please note that the withdrawal limit is <FaRupeeSign />500. You can request a withdrawal when your earnings reach this amount.
                </p>
                <Divider dashed className='wallet-divider' />
            </div>

            {/* Add Amount Modal */}
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
                                    label="Add amount to your account:"
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter amount',
                                        },
                                        {
                                            validator: validateAmount,
                                        },
                                    ]}
                                    className='common-input'
                                >
                                    <Input
                                        prefix={<MdOutlineCurrencyRupee className="input-icon" />}
                                        placeholder="Enter amount"
                                        type="number"
                                    />
                                </Form.Item>
                                <p className="withdrawal-note">
                                    NOTE: Please be aware that the minimum amount you can add is <FaRupeeSign />50 rupees. You can top up your account with this amount or more.
                                </p>
                                <div className="button-box">
                                    <Button htmlType="submit" className='common-blue-btn' loading={isBtnLoading}>
                                        Add Amount
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        : isWithdrawRequest ?
                            <div className='withdrawal-request'>
                                <p>You're just one step away from cashing in your earnings! Please complete the withdrawal request form, and we'll process your funds shortly</p>
                                <div className="button-box">
                                    <Button htmlType="submit" className='common-blue-btn' onClick={() => requestWithdrawal()} >
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