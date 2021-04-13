import React, { useState } from "react";
import { Nav, NavItem, Navbar, Collapse, NavbarToggler } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { preLogout} from '../../redux/ActionCreators';

function Header() {
  const dispatch = useDispatch();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const userLogin = useSelector((state) => state.userLogin);
  

  const renderNav = () => {

    if (userLogin.isLoggedIn) {
      return (
        <Nav className="mr-auto navigationLinks" navbar>
          <NavItem>
            <NavLink className="nav-link active ml-3" to="/profile">
              Profile
            </NavLink>
          </NavItem>
          <NavItem onClick={ () => dispatch(preLogout()) }>
            <NavLink className="nav-link active ml-3" to="/">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav className="mr-auto navigationLinks" navbar>
          <NavItem>
            <NavLink className="nav-link active ml-3" to="/signup">
              Signup
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link active ml-3" to="/">
              Login
            </NavLink>
          </NavItem>
        </Nav>
      );
    }
  };

  return (
    <div className="fixed-top">
      <Navbar dark expand="md" id="navbar" color="success">
        <div className="container">
          <NavLink to="/" className="navbar-brand" id="navBrand">
            TestTask
          </NavLink>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar>
            {renderNav()}
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
