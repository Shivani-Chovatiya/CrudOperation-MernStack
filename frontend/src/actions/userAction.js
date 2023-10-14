import axios from "axios";
import swal from "sweetalert";
// import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_RESET,
  USER_ALL_DETAILS_FAIL,
  USER_ALL_DETAILS_REQUEST,
  USER_ALL_DETAILS_SUCCESS,
  // FORGOT_PASSWORD_REQUEST,
  // FORGOT_PASSWORD_SUCCESS,
  // FORGOT_PASSWORD_FAIL,
} from "../constants/userConstants";

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { "Contnet-Type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:8080/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (image, name, email, password, mobile_no, gender, check, city, state) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = { headers: { "Contnet-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:8080/api/users",
        { image, name, email, password, mobile_no, gender, check, city, state },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     "Contnet-Type": "application/json",
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };
    // console.log(id);
    const { data } = await axios.post(
      // `http://localhost:8080/api/users/${id}`
      `http://localhost:8080/api/users/profile`,
      { id }
      // config
    );
    console.log(data);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile =
  (
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
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      // const {
      //   userLogin: { userInfo },
      // } = getState();
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };
      console.log(
        name,
        email,
        password,
        confirmPassword,
        mobile_no,
        gender,
        check,
        city,
        state
      );
      const { data } = await axios.put(
        "http://localhost:8080/api/users/update",
        {
          id,
          name,
          email,
          password,
          confirmPassword,
          mobile_no,
          gender,
          check,
          city,
          state,
        }
      );
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getallUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ALL_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:8080/api/users/getallusers`,
      config
    );

    dispatch({
      type: USER_ALL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ALL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/api/users/deleteuser", {
      userid,
    });

    swal("User Deleted Successfully!!!", "success");
    window.location.reload(); //href = "/admin/userlist";
    console.log(res);
  } catch (error) {
    swal("Error While Deleting User");
  }
};

export const searchProduct =
  (searchkey, searchCriteria) => async (dispatch) => {
    let searchedUser;

    try {
      dispatch({ type: USER_ALL_DETAILS_REQUEST });
      const res = await axios.get(
        "http://localhost:8080/api/users/getallusers"
      );
      searchedUser = res.data.filter((user) => {
        if (searchCriteria === "Name") {
          return user.name.includes(searchkey);
          // return searchProduct(searchkey);
        } else if (searchCriteria === "Email") {
          return user.email.includes(searchkey);
        }
        // user.name.toLowerCase().includes(searchkey)
      });

      dispatch({
        type: USER_ALL_DETAILS_SUCCESS,
        payload: searchedUser,
      });
    } catch (error) {
      dispatch({ type: USER_ALL_DETAILS_FAIL, payload: error });
    }
  };

export const searchProduct2 = (searchkey2) => async (dispatch) => {
  let searchedUser2;

  try {
    dispatch({ type: USER_ALL_DETAILS_REQUEST });
    const res = await axios.get("http://localhost:8080/api/users/getallusers");
    console.log(res.data.filter((user) => user.mobile_no.includes(searchkey2)));
    searchedUser2 = res.data.filter((user) =>
      user.email.toLowerCase().includes(searchkey2)
    );

    console.log(searchedUser2);
    dispatch({
      type: USER_ALL_DETAILS_SUCCESS,
      payload: searchedUser2,
    });
  } catch (error) {
    dispatch({ type: USER_ALL_DETAILS_FAIL, payload: error });
  }
};

// // Forgot Password
// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: FORGOT_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(
//       `http://localhost:8080/api/users/forgot`,
//       email,
//       config
//     );

//     dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: FORGOT_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
