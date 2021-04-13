import React, { useState , useEffect } from "react";
import { Row, Col, Card, Label, Button } from "reactstrap";
import "./Login.css";
import { Control, Form, Errors } from "react-redux-form";
import { actions } from "react-redux-form";
import { postLoginUser } from "../../redux/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function Login() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const history = useHistory();

  useEffect( () => {
    if(userLogin.isLoggedIn){
      history.push('/profile');
    }
  })


  let handleSubmit = (value) => {
  
    dispatch(postLoginUser(value));
  };

  return (
    <div className="container" id="loginForm">
      <div>
        <Form model="loginForm" onSubmit={(value) => handleSubmit(value)}>
          <Row>
            <Col>
              <div id="loginBg" className="login-page-bg">
                <img src="bg.jpg" alt="" />
              </div>
            </Col>
            <Col>
              <Card>
                <div className="login-title mt-3 mb-2 text-center">
                  <h2> Login </h2>
                </div>

                <Row className="form-group">
                  <Label
                    style={{ color: "green" }}
                    sm={{ size: 2, offset: 1 }}
                    htmlFor="email"
                  >
                    <i className="fa fa-envelope fa-2x"></i>
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      validators={{
                        required,
                        validEmail,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: "Required  /",
                        validEmail: " Invalid Email Address",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label
                    style={{ color: "green" }}
                    htmlFor="password"
                    sm={{ size: 2, offset: 1 }}
                  >
                    <i className="fa fa-key fa-2x" aria-hidden="true"></i>
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      type="password"
                      validators={{
                        required,
                        minLength: minLength(5),
                        maxLength: maxLength(25),
                      }}
                    />

                    <Errors
                      className="text-danger"
                      model=".password"
                      show="touched"
                      messages={{
                        required: "Required  /",
                        minLength: " Must be greater than 4 characters",
                        maxLength: " Must be 25 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col sm={{ size: 7, offset: 3 }}>
                    <Button
                      type="submit"
                      id="sumitFeedbackBtn"
                      color="success"
                      className="btn btn-success btn-lg btn-block"
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Login;
