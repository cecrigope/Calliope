import React from "react";
import { Router } from "@reach/router";

import Header from "./Header";
import Footer from "./Footer";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";

const Profile = () => (
  <div>
    <Header />
    <Router primary={false}>
      <TopArtists path="/" />
      <TopTracks path="/toptracks" />
    </Router>
    <Footer/>
  </div>
);

export default Profile;
