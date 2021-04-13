import * as ActionTypes from "../ActionTypes";

export const userLogin = (
  state = {
    isLoggedIn: false,
    name: "",
    email: "",
    phone : "",
    mobile : "",
    zipCode : "",
    profilePic : "",
    _id: "",
    nearestUser : [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return {
        isLoggedIn: action.payload.isLoggedIn,
        email: action.payload.email,
        name : action.payload.name,
        phone : action.payload.phone,
        mobile : action.payload.mobile,
        zipCode : action.payload.zipCode,
        profilePic : action.payload.profilePic,
        _id: action.payload._id,
      };
      case ActionTypes.USER_LOGOUT:
        return {
         ...action.payload,
        };
        case ActionTypes.NEAREST_USER:
        return {
          ...state , nearestUser : action.payload,
        };

    default:
      return state;
  }
};