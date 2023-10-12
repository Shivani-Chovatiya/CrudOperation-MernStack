import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userAction";
import FormContainer from "../../checkout/FormContainer";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

const UserDetail = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [check, setcheck] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const param = useParams();
  console.log(param.userId);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user?.name) {
        dispatch(getUserDetails(param.userId));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setPassword(user?.password);
        setConfirmPassword(user?.confirmPassword);
        setMobileNo(user?.mobile_no);
        setGender(user?.gender);
        setcheck(user?.check);
        setcity(user?.city);
        setstate(user?.state);
      }
    }
  }, [history, userInfo, user, dispatch]);

  return (
    <>
      <FormContainer>
        <h2>User Information</h2>

        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobile_no">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              value={mobile_no}
              placeholder="Enter Mobile no. "
              onChange={(e) => setMobileNo(e.target.value)}
              pattern="[1-9]{1}[0-9]{9}"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter Name"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="source">
            <Form.Label>How did you hear about this? </Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter Name"
              value={check}
              onChange={(e) => setcheck(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City </Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter Name"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="state">
            <Form.Label>State </Form.Label>
            <Form.Control
              type="text"
              // placeholder="Enter Name"
              value={state}
              onChange={(e) => setstate(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserDetail;
