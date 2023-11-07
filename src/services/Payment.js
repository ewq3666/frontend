import API from "../restAPI";
const Api = new API();

export default class paymentAPI{
    // payment order
    paymentOrder(payload){
        return Api.request("/orders",payload,"POST");
    }

    // payment verify
    verifyPayment(payload){
        return Api.request("/verify",payload,"POST");
    }

    // Add money 
    addMoneyApi(payload){
        return Api.request("/addmoney",payload,"POST");
    }
}