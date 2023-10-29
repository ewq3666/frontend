export const addUsers = (userData) => {
    return {
        type: "ADD_USERS",
        payload: userData,
    };
};