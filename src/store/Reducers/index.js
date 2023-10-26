import { combineReducers } from 'redux';
import ReducerFc from "./ReducersFc";

const rootReducer = combineReducers({
  counter: ReducerFc,
  // Add more reducers here if needed
});

export default rootReducer;