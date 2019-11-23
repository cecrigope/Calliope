import React from "react";
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

function Home() {
  return (
    <div>
      <MDBView className="headline">
        <MDBMask
          className="d-flex align-items-end headline-mask"
          pattern={8}
          overlay="black-strong"
        >
          <MDBContainer>
            <h1 className="white-text display-4">
              Get to know yourself. Musically.
            </h1>
          </MDBContainer>
        </MDBMask>
      </MDBView>
      <div className="what">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <h1>What is Calliope?</h1>
              <p>Admodum adipisicing quo pariatur. Nisi graviterque expetendis quem quibusdam,
              senserit labore malis litteris duis. Anim proident possumus a si sunt malis quem
              consequat.A pariatur a nostrud. Arbitror minim est consequat sempiternum, summis
              incurreret aut arbitrantur non tempor de laboris, possumus ubi iudicem, noster
              graviterque admodum tamen deserunt id ut cillum voluptate, sed noster de quid de
              nulla arbitrantur nescius magna ullamco. Sint mentitum imitarentur ut an aute
              voluptatibus, ipsum graviterque constias veniam incididunt, senserit in summis.</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

export default Home;
