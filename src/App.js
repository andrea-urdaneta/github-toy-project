import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import Home from "./views/Home";
import Profile from "./views/Profile";
import UserDetail from "./views/UserDetail";
import EditUserProfile from "./views/EditUserProfile";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/:username" exact component={UserDetail} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/edit" exact component={EditUserProfile} />
      </Switch>
    </HashRouter>
  );
};

export default App;
