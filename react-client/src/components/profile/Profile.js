import React, { useEffect } from "react";
import { Card, CardBody, CardImg, Row, Col, Button } from "reactstrap";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchNearestUser } from "../../redux/ActionCreators";

function Profile() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNearestUser());
  });

  return (
    <div id="profile" className="mb-5">
      <div className="container">
        <Card style={{ height: "400px", color: "#103c10" }}>
          <Row>
            <Col>
              <h3 className="text-center mt-4">Profile</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 4, offset: 1 }}>
              <CardImg src={userLogin.profilePic} className="profilePic" />
            </Col>
            <Col className="mt-5">
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Name : </h5>
                </Col>
                <Col sm={5}>
                  <h5> {userLogin.name} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Email : </h5>
                </Col>
                <Col>
                  <h5> {userLogin.email} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Mobile : </h5>
                </Col>
                <Col>
                  <h5> {userLogin.mobile} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Phone : </h5>
                </Col>
                <Col>
                  <h5> {userLogin.phone} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Zip code : </h5>
                </Col>
                <Col>
                  <h5> {userLogin.zipCode} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> User Id : </h5>
                </Col>
                <Col>
                  <h5> {userLogin._id} </h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <div id="nearestUser" className="mt-5">
          <h2 className="text-center mt-5 mb-3"> Nearest Users </h2>
          <RenderNearestUser userLogin={userLogin} />
        </div>
      </div>
    </div>
  );
}

export default Profile;




const RenderNearestUser = (props) => {

  let nearestUser = props.userLogin.nearestUser;

  if (nearestUser != undefined && nearestUser.length > 0) {

    return nearestUser.map((data , index ) => {
      return (
        <Card 
        key={index}
        className="mt-5"
          style={{
            height: "150px",
            color: "#103c10",
            backgroundColor: "#d4f9ef",
          }}
        >
          <Row>
            <Col className="mt-4" sm={{ size: 3, offset: 1 }}>
              <CardImg src={data.profilePic} className="nearestUserImg" />
            </Col>
            <Col className="mt-5">
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Name : </h5>
                </Col>
                <Col sm={5}>
                  <h5> {data.name} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Email : </h5>
                </Col>
                <Col>
                  <h5> {data.email} </h5>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 3, offset: 1 }}>
                  <h5> Phone : </h5>
                </Col>
                <Col>
                  <h5> {data.phone} </h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      );
    });
  } else {
    return <div></div>;
  }
};
