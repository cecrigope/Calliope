import React from "react";
import { token } from "../spotify";

import HomePage from "./HomePage";
import Profile from "./Profile";

function App() {
  return (
    <div>
      {token ? <Profile/> : <HomePage/>}
    </div>
  );
}

export default App;
