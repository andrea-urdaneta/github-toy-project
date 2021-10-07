import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

//API
import { getUserIdentity } from "../services/gitHubService";

const Login = () => {
  const history = useHistory();
  return (
    <Container>
      Hello from login
      <a href="https://github.com/login/oauth/authorize?client_id=61b7f54032a92e24d8ef">
        Get user
      </a>
    </Container>
  );
};

export default Login;
