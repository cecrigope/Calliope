import React from "react";
import { Router } from "@reach/router";

import Header from "./Header";
import Footer from "./Footer";
import MusicProfile from "./MusicProfile";
import ArtistProfile from "./ArtistProfile";

const Profile = () => (
  <div>
    <Header />
    <Router primary={false}>
      <MusicProfile path="/" />
      <ArtistProfile path="/artist/:artistId" />
    </Router>
    <Footer/>
  </div>
);

export default Profile;
