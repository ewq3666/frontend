const initialState = {
  userData: [],
};

export const ReducerFc = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
      default:
        return state;
  }
};

export default ReducerFc;
