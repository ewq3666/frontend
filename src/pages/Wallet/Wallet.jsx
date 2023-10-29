import React, { useState } from 'react';
import axios from "axios";
import { Button, Divider } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiWallet3Line } from "react-icons/ri";
import "./styles.scss";

const Wallet = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	});

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_utu5YvRUJRYmm3",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "https://backendupdated.vercel.app/api/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log("payment",data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "https://backendupdated.vercel.app/api/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log("order",data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

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
                        onClick={handlePayment}
                    > 
                        <span className='plus-icon'>+</span>
                        Add Amount
                    </Button>
                </div>
                <Divider dashed className='wallet-divider'/>

                {/* Withdraw Amount */}
                <div className="balence-box withdrawal-box">
                    <h3>Available Amount for Withdrawal:</h3>
                    <h3><FaRupeeSign /> 2000</h3>
                    <Button
                        className="Withdraw-btn"
                        // onClick={() => addAmountFunction(false, true)}
                    >
                        <span className='plus-icon'><FaRupeeSign /></span>
                        Withdrawal Amount
                    </Button>
                </div>
                <Divider dashed className='wallet-divider'/>
            </div>
        </div>
    )
}

export default Wallet;