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
  MDBModalFooter
} from "mdbreact";
import SpotifyAPI from "spotify-web-api-js";

function TopArtists() {
  const [openModal, setOpenModal] = useState(false);
  const [artists, setArtists] = useState(false);

  var token = window.localStorage.getItem("spotifyToken");

  if (token !== "undefined") {
    var spotify = new SpotifyAPI();
    spotify.setAccessToken(token);

    var options = {
      time_range: "long_term",
      limit: 50
    };

    if (artists === false) {
      spotify.getMyTopArtists(options, function(err, data) {
        setArtists(data.items);
      });
    }
  }

  function handleArtistProfile(artistId) {
    window.location.href = "/artistprofile/" + artistId;
  }

  return (
    <div className="body">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h1 style={{ marginBottom: 16 }}>My Top Artists</h1>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {artists &&
            artists.map(artist => (
              <MDBCol className="artist-card d-flex align-items-stretch" md={4} sm={12} key={artist.id}>
                <MDBCard
                  className="z-depth-1"
                  onClick={() => handleArtistProfile(artist.id)}
                >
                  <MDBCardImage
                    hoover
                    zoom
                    className="img-fluid artist-img"
                    src={artist.images[0].url}
                    waves
                  />
                  <MDBCardBody>
                    <MDBCardTitle>
                      <h2>{artist.name}</h2>
                    </MDBCardTitle>
                    <MDBCardText>
                      <p className="no-margin">
                        Popularity Score: {artist.popularity}
                      </p>
                      <p className="no-margin">
                        Followers:{" "}
                        {artist.followers.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default TopArtists;
