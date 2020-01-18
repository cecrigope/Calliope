import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-primary text-2xl mx-3 my-3">Calliope</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
