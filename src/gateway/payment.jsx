import * as Notifications from "../assets/messages.js";
import paymentAPI from "../services/Payment.js";
import { END_POINTS } from "../api/domain";
import axios from "axios";

const paymentApi = new paymentAPI();
const token = localStorage.getItem('token')

export const handlePayment = async (amount,userInfo) => {
	try {
		const payload = {
			amount: amount
		}
		const { data } = await paymentApi.paymentOrder(payload);
		initPayment(data.data,userInfo,amount);
	} catch (error) {
		console.log(error);
	}
};

const initPayment = (orderData,userInfo,amount) => {
	const options = {
		key: "rzp_test_utu5YvRUJRYmm3",
		amount: amount,
		currency: orderData.currency,
		name: userInfo.name,
		description: userInfo.user_email,
		order_id: orderData.id,
		handler: async (response) => {
			try {
				const orderUrl = END_POINTS.orders;
				// const { data } = await paymentApi.paymentOrder(response);
				const { data } = await axios.post(orderUrl, { amount: amount });
				if(data) {
					addMoneyApi(orderData,userInfo,amount)
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
};

const addMoneyApi = async(orderData, userInfo,amount) => {
	try {
		const payload = {
			userId: userInfo._id,
			user_email: userInfo.user_email,
			orderId: orderData.id,
			amount: amount
		}
		const { data } = await paymentApi.addMoneyApi(payload);
		if(data) {
			Notifications.paymentAddSuccessFully(userInfo.name,amount)
			getBalence(userInfo.name);
			
		}
		
	} catch (error) {
		console.log("api error:")
	}
}

  const getBalence = async (name) => {
    try {
      const money = await axios.get(END_POINTS.getBalence + name, { headers: { authorization: token } });
      if (money.data?.balance) {
        dispatch(userBalance(money.data.balance))
      }
    } catch (error) {
      console.log("error", error)
    }
  }
