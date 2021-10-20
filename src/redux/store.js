import { createStore, combineReducers } from "redux";
import authUserReducer from "./ducks/authUser";
import usersReducer from "./ducks/users";

const reducers = combineReducers({
  authUserReducer,
  usersReducer,
});

export default createStore(reducers);
