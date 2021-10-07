import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const UserDetail = () => {
  const history = useHistory();
  return (
    <div>
      detail page
      <Button onClick={() => history.push("/home")}>Go to home</Button>
    </div>
  );
};

export default UserDetail;
