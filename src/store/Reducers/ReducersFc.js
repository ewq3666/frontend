// Initial state
const initialState = {
  userData: [],
  contestList: [],
  joinedContestList: [],
  balance: []
};

export const ReducerFc = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case "GET_CONTEST_LIST":
      return {
        ...state,
        contestList: [...state.contestList, action.payload],
      }
    case "GET_JOINED_CONTEST_LIST":
      return {
        ...state,
        joinedContestList: [...state.joinedContestList, action.payload],
      }
    case "UPDATE_PROFILE":
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case "USER_BALENCE":
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

export default ReducerFc;

