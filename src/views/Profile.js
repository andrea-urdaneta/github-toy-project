import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Breadcrumbs, Box, Container } from "@material-ui/core";

//COMPONETS
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

//REDUX
import { selectAuthUser } from "../redux/ducks/authUser";

const stateSelector = createSelector([selectAuthUser], (authUser) => ({
  authUser,
}));

const Profile = () => {
  const history = useHistory();
  const { authUser } = useSelector(stateSelector);

  const handleEdit = async () => {
    history.push("/profile/edit");
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box width="70%" margin="auto" marginY="1rem">
          <Breadcrumbs style={{ color: "white" }}>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
            <Box>Profile</Box>
          </Breadcrumbs>
        </Box>

        <Box display="flex" width="70%" margin="auto">
          <ProfileCard user={authUser} isAuthUser handleEdit={handleEdit} />
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
