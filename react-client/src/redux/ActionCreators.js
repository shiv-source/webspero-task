import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { apiURL } from "../config/apiURL";
import jwt from "jsonwebtoken";

export const postLoginUser = (credential) => (dispatch) => {

    axios.post(apiURL + "api/login", credential).then((res) => {
  
      if (res.status === 200) {
        let token = res.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", JSON.stringify(token));
        let decoded = jwt.decode(token);
        let user = {
          isLoggedIn: true,
          name : decoded.name,
          email : decoded.email,
          phone : decoded.phone,
          mobile : decoded.mobile,
          zipCode : decoded.zipCode,
          profilePic : decoded.profilePic,
          _id : decoded._id
        };
        dispatch(addUser(user));
        alert(`Logged in as ${user.name}`)
      }
  
    }).catch((err) => {
      console.log(err.response);
    })
  };
  
  export const addUser = (user) => ({
    type: ActionTypes.USER_LOGIN,
    payload: user,
  });
  
  
  
  export const preLogout = () => (dispatch) => {
     localStorage.removeItem("token");
     let user = {
      name :"",
      email : "", 
      phone : "",
      mobile : "",
      zipCode : "",
      profilePic : "",
      _id :"",
      nearestUser : [],
     }
     dispatch(logOut(user))
  
  };
  
  
  export const logOut = (user) => ({
    type: ActionTypes.USER_LOGOUT,
    payload : user
  });
  

  export const fetchNearestUser = () => (dispatch) => {

    axios.get(apiURL + "api/nearest-users")
    .then((res) => { 

      if(res.status === 200 ){
        let nearestUser = res.data.result;
        localStorage.setItem('nearestUser' , JSON.stringify(res.data.result));
        dispatch(addNearestUser(nearestUser));

      }
        
    })
    .catch((err) => console.log(err));
  } 
  

  export const addNearestUser = (nearestUser) => ({
    type: ActionTypes.NEAREST_USER,
    payload: nearestUser,
  });
  