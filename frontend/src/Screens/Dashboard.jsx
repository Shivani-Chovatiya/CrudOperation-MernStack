import React from "react";
import { Button } from "react-bootstrap";

const Dashboard = ({ history }) => {
  return (
    <>
      <Button onClick={() => history.push("/login")}>Login</Button>
      <Button onClick={() => history.push("/register")}>Register</Button>
    </>
  );
};

export default Dashboard;
