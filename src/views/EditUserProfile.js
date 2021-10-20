import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  Breadcrumbs,
  Box,
  Container,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@material-ui/core";

import Navbar from "../components/Navbar";

//API
import { updateAuthUser } from "../services/gitHubService";

//REDUX
import { selectAuthUser, set_auth_user } from "../redux/ducks/authUser";

const stateSelector = createSelector([selectAuthUser], (authUser) => ({
  authUser,
}));

const actionDispatch = (dispatch) => ({
  setAuthUser: (authUser) => dispatch(set_auth_user(authUser)),
});

const EditUserProfile = () => {
  const history = useHistory();

  const { authUser } = useSelector(stateSelector);
  const { setAuthUser } = actionDispatch(useDispatch());

  const { name, blog, twitter_username, company, location, hirable, bio } =
    authUser;

  const [editName, setEditName] = useState(name);
  const [editBlog, setEditBlog] = useState(blog);
  const [editTwitter, setEditTwitter] = useState(twitter_username);
  const [editHirable, setEditHirable] = useState(hirable ? "true" : "false");
  const [editCompany, setEditCompany] = useState(company);
  const [editLocation, setEditLocation] = useState(location);
  const [editBio, setEditBio] = useState(bio);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updateData = {
      name: editName,
      blog: editBlog,
      twitter_username: editTwitter,
      company: editCompany,
      location: editLocation,
      hirable: editHirable === "true" ? true : false,
      bio: editBio,
    };

    const response = await updateAuthUser(updateData);

    setAuthUser(response);

    history.push("/profile");
  };
  return (
    <>
      <Navbar />
      <Container>
        <Box width="70%" margin="auto" marginTop="1rem">
          <Breadcrumbs style={{ color: "white" }}>
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
            <Link to="/profile" style={{ color: "white" }}>
              Profile
            </Link>
            <Box>Edit Profile</Box>
          </Breadcrumbs>
        </Box>
        <Box
          display="flex"
          width="70%"
          margin="auto"
          flexDirection="column"
          alignItems="center"
        >
          <Box width="70%">
            <Box component="h1">Edit Profile</Box>
            <form onSubmit={handleUpdate}>
              <Box display="flex" flexDirection="column">
                <TextField
                  value={editName}
                  label="Name"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <TextField
                  value={editBlog}
                  label="Blog"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setEditBlog(e.target.value)}
                />
                <TextField
                  value={editLocation}
                  label="Location"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
                <TextField
                  value={editCompany}
                  label="Company"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setEditCompany(e.target.value)}
                />
                <TextField
                  value={editTwitter}
                  label="Twitter"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setEditTwitter(e.target.value)}
                />
                <FormControl
                  component="fieldset"
                  style={{ marginBottom: "1rem" }}
                >
                  <FormLabel component="legend">Hirable</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={editHirable}
                    row
                    onChange={(e) => setEditHirable(e.target.value)}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  value={editBio}
                  label="Bio"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  multiline
                  rows={4}
                  onChange={(e) => setEditBio(e.target.value)}
                />
                <Box
                  marginTop="1rem"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Button
                    variant="contained"
                    onClick={() => history.push("/profile")}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    {isLoading ? <CircularProgress /> : "Save"}
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditUserProfile;
