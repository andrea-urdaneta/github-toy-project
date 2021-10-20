import { createSelector } from "reselect";

//CONST
const SET_AUTH_USER = "toyProject/authUser/set_auth_user";

//INITIAL STATE
const initalState = {
  authUser: {},
};

//REDUCER
const authUserReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return { ...state, authUser: action.payload };
    default:
      return state;
  }
};

export default authUserReducer;

//ACTIONS
export const set_auth_user = (payload) => ({
  type: SET_AUTH_USER,
  payload,
});

//SELECTORS
const authUserState = (state) => state.authUserReducer;

export const selectAuthUser = createSelector(
  authUserState,
  (authUser) => authUser.authUser
);
