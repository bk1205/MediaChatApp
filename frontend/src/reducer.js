export const initialState = {
  user: null,
  peer: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_PEER: "SET_PEER",
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_PEER:
      return {
        ...state,
        peer: action.peer,
      };
    default:
      return state;
  }
};

export default reducer;
