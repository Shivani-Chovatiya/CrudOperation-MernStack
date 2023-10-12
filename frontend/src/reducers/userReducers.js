import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_ALL_DETAILS_FAIL,
  USER_ALL_DETAILS_REQUEST,
  USER_ALL_DETAILS_SUCCESS,
  // FORGOT_PASSWORD_REQUEST,
  // FORGOT_PASSWORD_SUCCESS,
  // FORGOT_PASSWORD_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_ALL_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_ALL_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const forgotPasswordReducer = (state = {}, action) => {
//   switch (action.type) {
//     case FORGOT_PASSWORD_REQUEST:
//       // case RESET_PASSWORD_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FORGOT_PASSWORD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         message: action.payload,
//       };

//     // case RESET_PASSWORD_SUCCESS:
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     success: action.payload,
//     //   };

//     case FORGOT_PASSWORD_FAIL:
//       //case RESET_PASSWORD_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     // case CLEAR_ERRORS:
//     //   return {
//     //     ...state,
//     //     error: null,
//     //   };

//     default:
//       return state;
//   }
// };
