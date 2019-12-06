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
                <MDBNavItem>
                <a className="nav-btn" href="/topartists">
                  My Top Artists
                </a>
                </MDBNavItem>
                <MDBNavItem>
                <a className="nav-btn" href="/toptracks">
                  My Top Tracks
                </a>
                </MDBNavItem>
              </MDBNavbarNav>
            ) : (
              <MDBNavbarNav right>
                <MDBNavItem>
                  <a className="nav-btn" href="http://www.localhost:8888">
                    Getting Started
                  </a>
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
