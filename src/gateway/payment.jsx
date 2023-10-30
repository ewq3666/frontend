import axios from "axios";
import { END_POINTS } from "../api/domain";
import { async } from "q";

export const handlePayment = async (amount,userInfo) => {
	console.log("amount",amount)
	console.log("userinfo 2",userInfo)
	try {
		const orderUrl = END_POINTS.orders;
		const { data } = await axios.post(orderUrl, { amount: amount });
		console.log("data",data);
		initPayment(data.data,userInfo);
	} catch (error) {
		console.log(error);
	}
};

const initPayment = (data,userInfo) => {
	const options = {
		key: "rzp_test_utu5YvRUJRYmm3",
		amount: data.amount,
		currency: data.currency,
		name: userInfo.name,
		description: userInfo.user_email,
		order_id: data.id,
		handler: async (response) => {
			try {
				const verifyUrl = END_POINTS.verify;
				const { data } = await axios.post(verifyUrl, response);
				console.log("data 2",data);
				if(data) {
					
				}
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
	addMoneyApi(data,userInfo)
};

const addMoneyApi = async(orderData, userInfo) => {
	try {
		const payload = {
			userId: userInfo._id,
			user_email: userInfo.user_email,
			orderId: orderData.id,
			amount: orderData.amount
		}
		console.log("calling API")

		const { data } = await axios.post(END_POINTS.addmoney, payload);
		console.log("data add money:",data);
		
	} catch (error) {
		console.log("api error:")
	}
}