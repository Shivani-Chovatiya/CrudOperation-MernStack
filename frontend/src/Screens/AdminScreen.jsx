import React, { useEffect, useState } from "react";
import {
  Nav,
  Form,
  Row,
  Col,
  Container,
  Button,
  FormControl,
  ButtonGroup,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import Userlist from "./CrudOperatin/Userlist";
import AddNewUser from "./CrudOperatin/AddNewUser";
import EditUsers from "./CrudOperatin/EditUsers";
import UserDetail from "./CrudOperatin/UserDetail";
import { logout, searchProduct } from "../actions/userAction";

const AdminScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const redirect = "/";
  useEffect(() => {
    if (!userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    //console.log("Logout");
  };
  const [searchCriteria, setsearchCriteria] = useState("Name");

  const [searchkey, setsearchkey] = useState("");
  const [searchkey2, setsearchkey2] = useState("");
  return (
    <>
      <Container>
        <Row className="text-center bg-dark text-light p-3">
          <Col>
            <h1>DashBoard</h1>
          </Col>
          <Col md={2}>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/">
                {/* <Nav.Link> */}
                <i className="fas fa-user"></i>
                &nbsp; login
                {/* </Nav.Link> */}
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          {/* <h1 className="text-center bg-dark text-light p-3">DashBoard</h1> */}
          {/* {userInfo ? (
            <NavDropdown title={userInfo.name}>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link to="/">
            
              <i className="fas fa-user"></i>
              &nbsp; login
             
            </Link>
          )} */}

          <Col md={3}>
            <ButtonGroup
              // vertical
              // horizontal
              style={{
                minHeight: "10px",
                minWidth: "700px",
                "margin-top": "10px",
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
