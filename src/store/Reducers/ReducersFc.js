const initialState = {
  userData: [],
  contestList: []
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
    default:
      return state;
  }
};

export default ReducerFc;
