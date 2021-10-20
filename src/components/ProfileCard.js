import React from "react";
import { Box, Avatar, Tooltip, Badge, Button, Chip } from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";

const ProfileCard = ({
  user,
  authUserIsFollowing,
  handleFollow,
  isAuthUser,
  handleEdit,
}) => {
  return (
    <>
      <Box textAlign="center">
        <Avatar
          src={user.avatar_url}
          style={{ width: "150px", height: "150px", marginBottom: "1rem" }}
        />
        {isAuthUser ? (
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit Profile
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleFollow}>
            {authUserIsFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>

      <Box marginLeft="1rem">
        <Box component="h2" margin="0" display="flex" alignItems="center">
          <Box marginRight="1rem">{user.login}</Box>
          {authUserIsFollowing && (
            <Chip
              label="Following"
              color="secondary"
              size="small"
              style={{ marginRight: "0.5rem" }}
            />
          )}

          <Tooltip title="Public Repos">
            <Badge badgeContent={user.public_repos} color="primary">
              <BookIcon />
            </Badge>
          </Tooltip>
        </Box>
        <p>
          {user.name} - ID: {user.id}
        </p>
        <p> {user.email}</p>
        <p>Location: {user.location}</p>
        <p>Biography: {user.bio}</p>
      </Box>
    </>
  );
};

export default ProfileCard;
