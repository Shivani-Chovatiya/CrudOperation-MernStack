import React, { useEffect } from "react";
import { deleteUser, getallUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import Message from "../../components/shared/Message";
import { Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Userlist = () => {
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = userState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallUser());
  }, [dispatch]);

  // console.log(users.length);

  return (
    <div>
      <h1>Userlist</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">Error While Fetching Users</Message>}

      {users?.length !== 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th> Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.image}
                      alt="logo"
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_no}</td>
                  <td>
                    <Link to={`/admin/detail/${user._id}`}>
                      <AiFillEye style={{ cursor: "pointer" }} />
                    </Link>
                    <Link to={`/admin/edituser/${user._id}`}>
                      <AiFillEdit style={{ cursor: "pointer" }} />
                    </Link>
                    <AiFillDelete
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        dispatch(deleteUser(user._id));
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h2>No data Found</h2>
      )}
    </div>
  );
};

export default Userlist;
