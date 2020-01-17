import React, { useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter className="footer">
      <MDBContainer>
        <MDBRow>
          <MDBCol md={12} className="no-margin">
            <p className="text-white no-margin">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="http://www.cecrigope.com"> César C. González P.</a>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;
