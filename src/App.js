import { useEffect } from "react";
import { Router } from "./Routers/Router";
import { useDispatch } from 'react-redux';
import { END_POINTS } from './api/domain';
import { contestList, addUsers } from './store/actions/reducerActions';
import axios from "axios";
import "./Style/theme.css";
import "./Style/globalStyles.scss";
import QuizComponent from "./quize/Quize";
import QuizApp from "./quize/Quize";
import contestAPI from './services/Contest';

const contestApi = new contestAPI();

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // If User Already logged then take that user data
  useEffect(async () => {
    if (token) {
      let userInfo = await axios.get(END_POINTS.userInfo, { headers: { authorization: token } })
      dispatch(addUsers(userInfo.data.result))
    }
    const getContestList = async() => {
      const response = await contestApi.getAllContest();
      dispatch(contestList(response.data.result))
      // response.data
    }
    getContestList();
  }, [])

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
