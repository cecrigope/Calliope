import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBJumbotron
} from "mdbreact";
import SpotifyAPI from "spotify-web-api-js";

function TopTracks() {
  const [openModal, setOpenModal] = useState(false);
  const [tracks, setTracks] = useState(false);

  var token = window.localStorage.getItem("spotifyToken");

  if (token !== "undefined") {
    var spotify = new SpotifyAPI();
    spotify.setAccessToken(token);

    var options = {
      time_range: "long_term",
      limit: 50
    };

    if (tracks === false) {
      spotify.getMyTopTracks(options, function(err, data) {
        console.log(data.items);
        setTracks(data.items);
      });
    }
  }

  return (
    <div className="body">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h1 style={{ marginBottom: 16 }}>My Top Tracks</h1>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {tracks &&
            tracks.map(track => (
              <MDBCol sm={12}>
                <MDBJumbotron className="jumbotron-track">
                  <MDBRow>
                    <MDBCol md={3}>
                      <img className="img-fluid" src={track.album.images[0].url} />
                    </MDBCol>
                    <MDBCol md={9}>
                      <h2>{track.name}</h2>
                      <p className="no-margin">
                        {track.artists.length > 1 ? "Artists" : "Artist"}:{" "}
                        {track.artists.length > 1
                          ? track.artists.map((artist, index) =>
                              index + 1 === track.artists.length
                                ? artist.name
                                : artist.name + ", "
                            )
                          : track.artists[0].name}
                      </p>
                      <p className="no-margin">Album: {track.album.name}</p>
                      <p className="no-margin">
                        Popularity Score: {track.popularity}
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBJumbotron>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default TopTracks;
