import { useEffect } from "react";
import { Router } from "./Routers/Router";
import { useDispatch } from 'react-redux';
import { END_POINTS } from './api/domain';
import { contestList, addUsers, userBalance } from './store/actions/reducerActions';
import axios from "axios";
import "./Style/theme.css";
import "./Style/globalStyles.scss";
import QuizComponent from "./quize/Quize";
import QuizApp from "./quize/Quize";
import contestAPI from './services/Contest';
import paymentAPI from "./services/Payment.js";

const contestApi = new contestAPI();

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // If User Already logged then take that user data
  useEffect(() => {

    if (token) {
      const userDetails = async () => {
        let userInfo = await axios.get(END_POINTS.userInfo, { headers: { authorization: token } })
        dispatch(addUsers(userInfo.data.result))
        if (userInfo.data.result) {
          getBalence(userInfo.data.result._id)
        }
      }
      userDetails()
    }

    const getContestList = async () => {
      const response = await contestApi.getAllContest();
      dispatch(contestList(response.data.result))
      // response.data
    }
    getContestList();
  }, [])

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

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
