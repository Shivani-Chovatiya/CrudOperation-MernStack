import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Userlist from "./CrudOperatin/Userlist";
import AddNewUser from "./CrudOperatin/AddNewUser";
import EditUsers from "./CrudOperatin/EditUsers";
import UserDetail from "./CrudOperatin/UserDetail";
import { searchProduct } from "../actions/userAction";

const AdminScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [searchCriteria, setsearchCriteria] = useState("Name");

  const [searchkey, setsearchkey] = useState("");
  const [searchkey2, setsearchkey2] = useState("");
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center bg-dark text-light p-3">DashBoard</h1>
          <Col md={3}>
            <ButtonGroup
              // vertical
              // horizontal
              style={{
                minHeight: "10px",
                minWidth: "700px",
              }}
            >
              <Button
                className="text-center bg-dark text-light p-3"
                onClick={() => history.push("/admin/userlist")}
              >
                All Users
              </Button>

              <Button
                className="text-center bg-dark text-light p-3 "
                onClick={() => history.push("/admin/addnewuser")}
              >
                Add New User
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="ml-2"
                aria-label="Search"
                value={searchkey}
                onChange={(e) => setsearchkey(e.target.value)}
                style={{
                  color: "green",
                  padding: "10px",
                  border: "1px solid #ccc",
                  "border-radius": "5px",
                  backgroundcolor: "red",
                  fontsize: "16px",
                  width: "100%",
                  height: "20%",
                  "margin-top": "10px",
                }}
              />
              <Form.Select
                onChange={(e) => setsearchCriteria(e.target.value)}
                style={{
                  color: "green",
                  padding: "10px",
                  border: "1px solid #ccc",
                  "border-radius": "5px",
                  backgroundcolor: "red",
                  fontsize: "16px",
                  width: "100%",
                  height: "20%",
                  "margin-top": "10px",
                }}
              >
                <option value="Name">Name</option>
                <option value="Email">Email</option>
              </Form.Select>

              <Button
                variant="outline-success"
                className="text-center bg-dark text-light  "
                onClick={() => {
                  dispatch(searchProduct(searchkey, searchCriteria));
                }}
                style={{ "margin-top": "10px" }}
              >
                Search
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Switch>
              <Route exact path="/admin" component={Userlist} />
              <Route exact path="/admin/userlist" component={Userlist} />

              <Route exact path="/admin/addnewuser" component={AddNewUser} />

              <Route
                exact
                path="/admin/edituser/:userId"
                component={EditUsers}
              />
              <Route
                exact
                path="/admin/detail/:userId"
                component={UserDetail}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminScreen;
