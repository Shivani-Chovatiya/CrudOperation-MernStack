import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import FormContainer from "../checkout/FormContainer";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/admin";
  console.log(redirect);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(login(email, password));
  };

  return (
    <>
      <FormContainer>
        <h2>SIGN IN</h2>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              // name="email"
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              //name="password"
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button className="mb-3" type="submit" varient="primary">
            SING IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ?
            <Link to={redirect ? `register?redirect=${redirect}` : "/register"}>
              {/* <Nav.Link type="button" className="mb-3" href="/register">
              Register
            </Nav.Link> */}
              Register
            </Link>
          </Col>
        </Row>
        {/* <Row>
        <Col>
          <Link to={"/forgotpassword"}>Forgot Password ?</Link>
        </Col>
      </Row> */}
      </FormContainer>
    </>
  );
};

export default Login;
