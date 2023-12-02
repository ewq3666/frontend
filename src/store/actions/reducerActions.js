export const addUsers = (userData) => {
    return {
        type: "ADD_USERS",
        payload: userData,
    };
};

export const contestList = (contestData) => {
    return {
        type: "GET_CONTEST_LIST",
        payload: contestData,
    };
};
export const joinedContestList = (contestData) => {
    return {
        type: "GET_JOINED_CONTEST_LIST",
        payload: contestData,
    };
};
export const updateProfile = (userData) => ({
    type: 'UPDATE_PROFILE',
    payload: userData,
  })

export const userBalance = (balance) => ({
    type: 'USER_BALENCE',
    payload: balance,
  })
