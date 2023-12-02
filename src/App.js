import { useEffect, useState } from "react";
import { Router } from "./Routers/Router";
import { useDispatch } from 'react-redux';
import { END_POINTS } from './api/domain';
import { contestList, addUsers, userBalance, joinedContestList } from './store/actions/reducerActions';
import contestAPI from './services/Contest';
import "./Style/globalStyles.scss";
import "./Style/theme.css";
import axios from "axios";

const contestApi = new contestAPI();

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});

  // If User Already logged then take that user data
  useEffect(() => {

    // Get user info
    const userDetails = async () => {
      try {
        let userInfo = await axios.get(END_POINTS.userInfo, { headers: { authorization: token } });
        setUserData(userInfo.data?.result)
        dispatch(addUsers(userInfo.data.result))
        if (userInfo.data.result) {
          getBalence(userInfo.data?.result?._id)
        }
      } catch (error) { }
    }

    // Get contest list
    const getContestList = async () => {
      try {
        const response = await contestApi.getAllContest();
        dispatch(contestList(response.data.result));
      } catch (error) { }
    }

    getContestList();
    if (token) {
      userDetails();
    }
  }, [])

  useEffect(() => {
    // Get join contest 
    const getJoinContes = async () => {
      try {
        if(userData._id) {
          const response = await axios.get(END_POINTS.joinedContest + userData._id)
          dispatch(joinedContestList(response.data))
        }
      } catch (error) {
        console.log("error", error)
      }
    }

    if (token && userData) {
      getJoinContes();
    }
  }, [userData])

  // Get balence
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
