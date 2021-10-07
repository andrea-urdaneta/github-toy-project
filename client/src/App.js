import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "./views/Auth";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import UserDetail from "./views/UserDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/user" exact component={UserDetail} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/auth/callback" exact component={Auth} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
