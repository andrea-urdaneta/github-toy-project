import { createSelector } from "reselect";

//CONST
const SET_USERS = "toyProject/users/set_users";
const SET_IS_SEARCH = "toyProject/users/set_is_search";
const SET_DEBOUNCED_SEARCH = "toyProject/users/set_debounced_search";
const SET_NEXT_USERS = "toyProject/users/set_next_users";
const SET_SEARCH = "toyProject/users/set_search";

//INITIAL STATE
const initalState = {
  users: [],
  isSearch: false,
  debouncedSearch: "",
  nextUsers: 0,
  search: "",
};

//REDUCER
const usersReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_IS_SEARCH:
      return { ...state, isSearch: action.payload };
    case SET_DEBOUNCED_SEARCH:
      return { ...state, debouncedSearch: action.payload };
    case SET_NEXT_USERS:
      return { ...state, nextUsers: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

export default usersReducer;

//ACTIONS
export const set_users = (payload) => ({
  type: SET_USERS,
  payload,
});

export const set_is_search = (payload) => ({
  type: SET_IS_SEARCH,
  payload,
});

export const set_debounced_search = (payload) => ({
  type: SET_DEBOUNCED_SEARCH,
  payload,
});

export const set_next_users = (payload) => ({
  type: SET_NEXT_USERS,
  payload,
});

export const set_search = (payload) => ({
  type: SET_SEARCH,
  payload,
});

//SELECTORS
const usersState = (state) => state.usersReducer;

export const selectUsers = createSelector(usersState, (users) => users.users);

export const selectIsSearch = createSelector(
  usersState,
  (users) => users.isSearch
);

export const selectDebouncedSearch = createSelector(
  usersState,
  (users) => users.debouncedSearch
);

export const selectNextUsers = createSelector(
  usersState,
  (users) => users.nextUsers
);

export const selectSearch = createSelector(usersState, (users) => users.search);
