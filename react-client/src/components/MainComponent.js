import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./login/Login";
import Header from "./header/Header";
import Profile from './profile/Profile';
import Signup from './signup/signup';
import { connect } from 'react-redux';
import jwt from "jsonwebtoken";
import { addUser } from '../redux/ActionCreators';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch( addUser(user)),
});


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      this.checkLoginStatus();
  }

  checkLoginStatus(){
    let token = JSON.parse(localStorage.getItem("token"));
    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      let decoded = jwt.decode(token);
      let user = {
        name : decoded.name,
        email : decoded.email,
        phone : decoded.phone,
        mobile : decoded.mobile,
        zipCode : decoded.zipCode,
        profilePic : decoded.profilePic,
        _id : decoded._id,
        isLoggedIn :true,
      };
      this.props.addUser(user)
    }
  }


  render() {
    return (
      <React.Fragment>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute authed={this.props.userLogin.isLoggedIn} component={Profile} />
            <Redirect to="/" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}