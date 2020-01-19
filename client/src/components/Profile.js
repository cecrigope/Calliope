import React from "react";
import { Router } from "@reach/router";

import Header from "./Header";
import Footer from "./Footer";
import MusicProfile from "./MusicProfile";

const Profile = () => (
  <div>
    <Header />
    <Router primary={false}>
      <MusicProfile path="/" />
    </Router>
    <Footer/>
  </div>
);

export default Profile;
