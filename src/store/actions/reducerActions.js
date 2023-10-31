export const addUsers = (userData) => {
    return {
        type: "ADD_USERS",
        payload: userData,
    };
};
export const updateProfile = (userData) => ({
    type: 'UPDATE_PROFILE',
    payload: userData,
  })