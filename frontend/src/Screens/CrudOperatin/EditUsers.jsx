import React, { useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormContainer from "../../checkout/FormContainer";
import Message from "../../components/shared/Message";
import Loader from "../../components/shared/Loader";
import { Form, Row, Col, Button } from "react-bootstrap";

const EditUsers = ({ history }) => {
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

  const updatePrductState = useSelector((state) => state.userUpdateProfile);
  const { updateloading, success, updateerror } = updatePrductState;

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

  const submitForm = (e) => {
    //console.log(e)
    e.preventDefault();

    const id = param.userId;
    dispatch(
      updateUserProfile(
        id,
        name,
        email,
        password,
        confirmPassword,
        mobile_no,
        gender,
        check,
        city,
        state
      )
    );
  };

  return (
    <>
      <FormContainer>
        <h2>Update Information</h2>

        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Updated Successfully</Message>}
        <Form onSubmit={submitForm}>
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

          <div>
            <Form.Group
              className="mb-3"
              // id="formGridRadio"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gridRadios10"
                value="Male"
                required
                // checked
              />

              <Form.Check
                type="radio"
                label="Female"
                name="gridRadios10"
                value="Female"
                required
              />
            </Form.Group>
          </div>

          <Form.Group
            className="mb-3"
            // id="check1"
            value={check}
            onChange={(e) => setcheck(e.target.value)}
          >
            <Form.Label>How did you hear about this? </Form.Label>
            <Form.Check
              type="checkbox"
              label="LinkedIn"
              name="g2"
              value="LinkedIn"

              // checked
            />

            <Form.Check
              type="checkbox"
              label="Friends"
              name="g2"
              value="Friends"
            />
            <Form.Check
              type="checkbox"
              label="Others"
              name="g2"
              value="Others"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridState"
            className="mb-3"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          >
            <Form.Label>City</Form.Label>
            <Form.Select defaultValue="Choose..." required>
              <option>Choose...</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Pune">Pune</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            controlId="formGridCity"
            value={state}
            onChange={(e) => setstate(e.target.value)}
          >
            <Form.Label>State</Form.Label>

            <Form.Select defaultValue="Choose...">
              {/* <FormControl as="select" type="select" required> */}
              <option>Choose...</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">
                Dadar and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </Form.Select>
            {/* </FormControl> */}
          </Form.Group>

          <Button type="submit" varient="primary" className="mb-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditUsers;
