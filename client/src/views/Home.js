import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

//API
import { getAuthUser, getUsers, searchUsers } from "../services/gitHubService";

//COMPONENTS
import Navbar from "../components/Navbar";
import InfiniteList from "../components/InfiniteList";

//REDUX
import { set_auth_user } from "../redux/ducks/authUser";
import {
  set_users,
  selectUsers,
  selectIsSearch,
  selectDebouncedSearch,
  set_next_users,
  selectNextUsers,
  set_is_search,
  set_search,
} from "../redux/ducks/users";

const actionDispatch = (dispatch) => ({
  setAuthUser: (authUser) => dispatch(set_auth_user(authUser)),
  setUsers: (users) => dispatch(set_users(users)),
  setNextUsers: (nextUsers) => dispatch(set_next_users(nextUsers)),
  setIsSearch: (isSearch) => dispatch(set_is_search(isSearch)),
  setSearch: (search) => dispatch(set_search(search)),
});

const stateSelector = createSelector(
  [selectUsers, selectIsSearch, selectDebouncedSearch, selectNextUsers],
  (users, isSearch, debouncedSearch, nextUsers) => ({
    users,
    isSearch,
    debouncedSearch,
    nextUsers,
  })
);

const { ipcRenderer } = window;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  //REDUX STATE
  const { users, isSearch, debouncedSearch, nextUsers } =
    useSelector(stateSelector);
  const { setAuthUser, setUsers, setNextUsers, setIsSearch, setSearch } =
    actionDispatch(useDispatch());

  useEffect(() => {
    ipcRenderer.send("send-auth-token");
    ipcRenderer.receive("receive-auth-token", (data) => {
      localStorage.setItem("accessToken", data.accessToken);
    });

    const fetchData = async () => {
      const userResponse = await getAuthUser();
      const usersResponse = await getUsers();

      setAuthUser(userResponse);
      setUsers(usersResponse.users);
      setNextUsers(usersResponse.next.since);
      setIsLoading(false);
    };
    if (!isSearch) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    return () => {
      setIsSearch(false);
      setSearch("");
    };
  }, []);

  const loadNextPage = async () => {
    setIsNextPageLoading(true);
    if (isSearch) {
      const response = await searchUsers(debouncedSearch, nextUsers);
      setHasNextPage(!response.users.length < 30);
      setIsNextPageLoading(false);
      setNextUsers(nextUsers + 1);
      setUsers([...users, ...response.users]);
    } else {
      const response = await getUsers(nextUsers);

      setHasNextPage(!response.users.length < 30);
      setIsNextPageLoading(false);
      setNextUsers(response.next.since);
      setUsers([...users, ...response.users]);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container
        style={{ height: "calc(100vh - 56px)", padding: 0 }}
        maxWidth="xl"
      >
        <Navbar />
        {users.length ? (
          <InfiniteList
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
            items={users}
            loadNextPage={loadNextPage}
          />
        ) : (
          <div>no hay resultados</div>
        )}
      </Container>
    </>
  );
};

export default Home;
