import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getHashParams } from "./hash";

function AuthRoute({ component: Component, ...rest}) {
  var token = window.localStorage.getItem("spotifyToken");

  return (
    <Route
      {...rest}
      render={props =>
        token !== "undefined" ? <Component {...props}/> : <Redirect to="/" />
      }
    />
  )
}

export default AuthRoute;
