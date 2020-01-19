import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-1/4">
              <div className="py-3">
                <a className="h1 text-primary text-2xl" href="/">
                  Calliope
                </a>
              </div>
            </div>
            <div className="w-3/4">
              <div className="float-right py-3">
                <a className="text-white px-3" href="/">
                  My Music Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
