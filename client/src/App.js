import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getHashParams } from "./hash";
import AuthRoute from "./AuthRoute";

import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import ArtistProfile from "./pages/ArtistProfile";

function App() {
  const params = getHashParams();
  const token = params.access_token;

  if (token) {
    window.localStorage.setItem("spotifyToken", token);
    window.location.replace("/myprofile");
  }

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/myprofile" component={UserProfile} />
        <AuthRoute exact path="/artistprofile/:id" component={ArtistProfile} />
      </Router>
    </div>
  );
}

export default App;
