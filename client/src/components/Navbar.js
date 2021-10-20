import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Avatar, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

//API
import { searchUsers, getUsers } from "../services/gitHubService";

//REDUX
import { selectAuthUser } from "../redux/ducks/authUser";
import {
  selectDebouncedSearch,
  set_debounced_search,
  set_users,
  set_is_search,
  set_next_users,
  selectIsSearch,
  set_search,
  selectSearch,
} from "../redux/ducks/users";

const stateSelector = createSelector(
  [selectAuthUser, selectDebouncedSearch, selectIsSearch, selectSearch],
  (authUser, debouncedSearch, isSearch, search) => ({
    authUser,
    debouncedSearch,
    isSearch,
    search,
  })
);

const actionDispatch = (dispatch) => ({
  setDebouncedSearch: (debouncedSearch) =>
    dispatch(set_debounced_search(debouncedSearch)),
  setUsers: (users) => dispatch(set_users(users)),
  setIsSearch: (isSearch) => dispatch(set_is_search(isSearch)),
  setNextUsers: (nextUsers) => dispatch(set_next_users(nextUsers)),
  setSearch: (search) => dispatch(set_search(search)),
});

const Navbar = () => {
  const history = useHistory();

  const { authUser, debouncedSearch, isSearch, search } =
    useSelector(stateSelector);
  const { setDebouncedSearch, setUsers, setIsSearch, setNextUsers, setSearch } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  useEffect(() => {
    const search = async () => {
      const response = await searchUsers(debouncedSearch);
      history.push("/");

      setNextUsers(2);
      setUsers(response.users);
    };

    const searchAllUsers = async () => {
      const usersResponse = await getUsers();

      setIsSearch(false);
      setUsers(usersResponse.users);
      setNextUsers(usersResponse.next.since);
    };

    if (isSearch) {
      if (debouncedSearch) {
        search();
      } else {
        searchAllUsers();
      }
    }
  }, [debouncedSearch]);

  return (
    <Box
      style={{ backgroundColor: "#525f72" }}
      height="40px"
      display="flex"
      justifyContent="center"
      paddingY="0.5rem"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="70%"
      >
        <TextField
          value={search}
          label="Search by username"
          variant="outlined"
          size="small"
          color="primary"
          onChange={(e) => {
            setSearch(e.target.value);
            setIsSearch(true);
          }}
          //       onChange={(e) => handleSearch(e.target.value)}
        />

        <Box
          display="flex"
          alignItems="center"
          onClick={() => history.push("/profile")}
          style={{ cursor: "pointer" }}
        >
          {authUser.name}
          <Box marginLeft="1rem">
            <Avatar src={authUser.avatar_url} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
