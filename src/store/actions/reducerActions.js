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