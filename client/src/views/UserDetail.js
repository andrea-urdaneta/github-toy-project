import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Breadcrumbs,
  Box,
  Avatar,
  CircularProgress,
  Badge,
  Tooltip,
  Chip,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";

//COMPONENTS
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

//API
import {
  getUserDetail,
  followUser,
  unfollowUser,
  checkIfUserIsFollowing,
} from "../services/gitHubService";

const UserDetail = () => {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authUserIsFollowing, setAuthUserIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserDetail(username);
      const followingResponse = await checkIfUserIsFollowing(username);

      setUser(userResponse);
      setAuthUserIsFollowing(followingResponse);
      setIsLoading(false);
    };
    fetchData();
  }, [username]);

  const handleFollow = async () => {
    if (authUserIsFollowing) {
      await unfollowUser(username);
      setAuthUserIsFollowing(false);
    } else {
      await followUser(username);
      setAuthUserIsFollowing(true);
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
      <Navbar />

      <Container>
        <Box width="70%" margin="auto" marginY="1rem">
          <Breadcrumbs style={{ color: "white" }}>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
            <Box>{username}</Box>
          </Breadcrumbs>
        </Box>

        <Box display="flex" width="70%" margin="auto">
          <ProfileCard
            user={user}
            authUserIsFollowing={authUserIsFollowing}
            handleFollow={handleFollow}
          />
        </Box>
      </Container>
    </>
  );
};

export default UserDetail;
