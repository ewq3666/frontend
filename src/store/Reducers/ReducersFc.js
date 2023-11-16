// Initial state
const initialState = {
  userData: [] 
};

export const ReducerFc = (state = initialState, action) => {

  switch(action.type) {
    
    case 'ADD_USER': {
      return {
        ...state,
        userData: [...state.userData, action.payload]  
      }
    }

    case 'UPDATE_USER': {
      
      // Find user index
      const index = state.userData.findIndex(user => user.id === action.payload.id);
      
      // Copy user array
      const updatedData = [...state.userData]; 

      // Update user immutably
      updatedData[index] = {
        ...updatedData[index], 
        ...action.payload
      };

      return {
        ...state,
        userData: updatedData
      }

    }

    default: 
      return state;

  }

}
export default ReducerFc;

