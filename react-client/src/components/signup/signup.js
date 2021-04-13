import React from "react";
import { Control, Form, Errors } from "react-redux-form";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { Row, Col, Card, Label, Button } from "reactstrap";
import "./Signup.css";
import axios from 'axios';
import { apiURL } from '../../config/apiURL';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  resetSignupForm: () => {
    dispatch(actions.reset("signupForm"));
  },
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lang: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
  
    let formData = JSON.parse(JSON.stringify(value));
    formData.lat = this.state.lat;
    formData.lang = this.state.lang;
    formData.profilePic = value.profilePic[0];

    let form = new FormData();
    form.append("profilePic", formData.profilePic);
    form.append(  "name", formData.name,);
    form.append( "email", formData.email,);
    form.append(  "password", formData.password,);
    form.append(  "phone", formData.phone,);
    form.append( "mobile", formData.mobile,);
    form.append(  "zipCode", formData.zipCode,);
    form.append(    "lat", formData.lat,);
    form.append(   "lang", formData.lang,);

    this.props.resetSignupForm();

    axios.post(apiURL + "api/signup" , form )
        .then((res) => { 
          alert(res.data.message);
        })
        .catch( (err) => { 
             alert(err.response.data.message);  
        });
      
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lang = position.coords.longitude;
      this.setState({ lat: lat });
      this.setState({ lang: lang });
    });
  }

  render() {
    return (
      <div className="container" id="signupForm">
        <Form model="signupForm" onSubmit={(value) => this.handleSubmit(value)}>
          <div className="card">
            <div className="card-title text-center mt-3">
              <h3> Signup Form </h3>
            </div>
            <div className="card-body">
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="name">
                  Name :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Name is required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="email">
                  Email :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    validators={{
                      validEmail,
                      required,
                      
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                        required: 'Please provide an email address.',
                        validEmail:  (val) => `${val} is not a valid email. `,
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="password">
                  Password :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".password"
                    show="touched"
                    messages={{
                      required: "Password is required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="phone">
                  Phone :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".phone"
                    id="phone"
                    placeholder="Phone No"
                    name="phone"
                    className="form-control"
                    validators={{
                        isNumber,
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".phone"
                    show="touched"
                    messages={{
                      required: "Phone no is required. ",
                      isNumber : (val) => `${val} is not a valid phone no.`,
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="mobile">
                  Mobile :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".mobile"
                    id="mobile"
                    placeholder="Mobile No"
                    name="mobile"
                    className="form-control"
                    validators={{
                      isNumber,
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".mobile"
                    show="touched"
                    messages={{
                      required: "Mobile no is required. ",
                      isNumber : (val) => `${val} is not a valid mobile no.`,
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="zipCode">
                  Zipcode :
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".zipCode"
                    id="zipCode"
                    placeholder="Zipcode"
                    name="zipCode"
                    className="form-control"
                    validators={{
                      isNumber,
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".zipCode"
                    show="touched"
                    messages={{
                      required: "Zipcode no is required. ",
                      isNumber : (val) => `${val} is not a valid zipcode.`,
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label sm={{ size: 2, offset: 1 }} htmlFor="profilePic">
                  Profile pic :
                </Label>
                <Col md={8}>
                  <Control.file
                    model=".profilePic"
                    id="profilePic"
                    name="profilePic"
                    className="form-control"
                    validators={{
                      required,
                      
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".profilePic"
                    show="touched"
                    messages={{
                      required: "Profile pic is required",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ offset: 3, size: 8 }}>
                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                  >
                    Signup
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
