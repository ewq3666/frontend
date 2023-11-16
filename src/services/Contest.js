import API from "../restAPI";
const Api = new API();

export default class contestAPI{
    // get all contest
    getAllContest(payload){
        return Api.request("/admin/contest",payload,"GET");
    }
}