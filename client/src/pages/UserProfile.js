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
import LastFM from "last-fm";

function UserProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [artists, setArtists] = useState(false);
  const [artist, setArtist] = useState(false);

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

  function handleModal(value, artistInfo) {
    if (value) {
      const lastfm = new LastFM("ac4f3251f9926f343c4fe14f0ef33a41");
      lastfm.artistInfo({ name: artistInfo.name }, function(err, data) {
        data.picture = artistInfo.images[0].url;
        console.log(data);
        setArtist(data);
      });
    } else {
      setArtist(false);
    }

    setOpenModal(value);
  }

  function handleArtistProfile(artistId) {
    window.location.href = "/artistprofile/" + artistId;
  }

  return (
    <div className="body">
      <MDBContainer>
        <MDBRow>
          {artists &&
            artists.map(artist => (
              <MDBCol className="artist-card" size={4} key={artist.id}>
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
                      <h1>{artist.name}</h1>
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
      {/*
      <MDBModal isOpen={openModal} size="lg" centered>
        <MDBModalBody className="no-padding">
          {artist && (
            <div
              style={{
                backgroundImage: `url(${artist.picture})`,
                width: `100%`,
                height: `800px`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            >
              <div className="overlay" style={{ padding: `32px` }}>
                <h1 className="display-4 white-text">{artist.name}</h1>
                <p className="white-text">{artist.summary}</p>
              </div>
            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            className="no-margin"
            color="primary"
            onClick={() => handleModal(false, "")}
          >
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
*/}
    </div>
  );
}

export default UserProfile;
