import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getHashParams } from "./hash";
import AuthRoute from "./AuthRoute";

import "./App.css";

import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import MusicProfile from "./pages/MusicProfile";
import ArtistProfile from "./pages/ArtistProfile";

function App() {
  const params = getHashParams();
  const token = params.access_token;

  if (token) {
    window.localStorage.setItem("spotifyToken", token);
    window.location.replace("/topartists");
  }

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/topartists" component={TopArtists} />
        <AuthRoute exact path="/toptracks" component={TopTracks} />
        <AuthRoute exact path="/musicprofile" component={MusicProfile} />
        <AuthRoute exact path="/artistprofile/:id" component={ArtistProfile} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
