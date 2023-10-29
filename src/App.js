import { useEffect } from "react";
import { Router } from "./Routers/Router";
import { useDispatch } from 'react-redux';
import { END_POINTS } from './api/domain';
import { addUsers } from './store/actions/reducerActions';
import axios from "axios";
import "./Style/theme.css";
import "./Style/globalStyles.scss";
import QuizComponent from "./quize/Quize";
import QuizApp from "./quize/Quize";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // If User Already logged then take that user data
  useEffect(async () => {
    if (token) {
      let userInfo = await axios.get(END_POINTS.userInfo, { headers: { authorization: token } })
      dispatch(addUsers(userInfo.data.result))
    }
  }, [])

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
