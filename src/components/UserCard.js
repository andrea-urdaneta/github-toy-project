import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Chip, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import ScrollContainer from "react-indiana-drag-scroll";

const { ipcRenderer } = window;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(4),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

const UserCard = ({ index, style, data }) => {
  const classes = useStyles();
  const user = data[index];

  const { avatar_url, login, html_url, organizations } = user;

  const openUserProfile = (url) => {
    ipcRenderer.send("open-user-profile", url);
  };

  const renderOrganizations = () => {
    return (
      <>
        <Box component="small">Organizations:</Box>
        <Box width="100%" marginTop="0.5rem">
          <ScrollContainer
            horizontal
            vertical={false}
            style={{ height: "34px", display: "flex" }}
          >
            {organizations.map((org) => {
              return (
                <Chip label={org.login} key={org.id} className={classes.chip} />
              );
            })}
          </ScrollContainer>
        </Box>
      </>
    );
  };

  return (
    <div style={style}>
      <Box
        display="flex"
        marginY="1rem"
        justifyContent="space-between"
        width="70%"
        marginX="auto"
      >
        <Box display="flex" alignItems="center" width="80%">
          <Avatar
            alt={login}
            src={avatar_url ? avatar_url : ""}
            className={classes.large}
          />
          <Box display="flex" flexDirection="column" width="100%">
            <Box marginBottom="1rem" marginTop="0" component="h2">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/user/${login}`}
              >
                {login}
              </Link>
            </Box>

            {organizations.length ? renderOrganizations() : null}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Tooltip title="Go to GitHub">
            <IconButton
              onClick={() => openUserProfile(html_url)}
              color="primary"
              variant="contained"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default UserCard;
