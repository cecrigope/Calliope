import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
  MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import SpotifyAPI from "spotify-web-api-js";

function MenuBar() {
  const [user, setUser] = useState(false);
  const [collapse, setCollapse] = useState(false);

  var token = window.localStorage.getItem("spotifyToken");

  if (token !== "undefined" && !user) {
    var spotify = new SpotifyAPI();
    spotify.setAccessToken(token);
    spotify.getMe(function(err, data) {
      setUser(data);
    });
  }

  function handleCollapse() {
    setCollapse(!collapse);
  }

  function logout() {
    console.log("LOGOUT");
  }

  return (
    <Router>
      <MDBNavbar light expand="md" className="z-depth-0">
        <MDBContainer>
          <MDBNavbarBrand>
            <a href="/">
              <MDBNavbarBrand>Calliope</MDBNavbarBrand>
            </a>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={() => handleCollapse()} />
          <MDBCollapse isOpen={collapse} navbar>
            {token !== "undefined" && user ? (
              <MDBNavbarNav right>
                {/*
                <MDBNavItem onClick={() => logout()}>Logout</MDBNavItem>
                */}
                <a href="/myprofile">
                  <MDBNavItem>Welcome, {user.display_name}</MDBNavItem>
                </a>
              </MDBNavbarNav>
            ) : (
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBBtn
                    color="primary"
                    className="z-depth-0"
                    href="http://localhost:8888"
                  >
                    Get Started
                  </MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>
            )}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </Router>
  );
}

export default MenuBar;
