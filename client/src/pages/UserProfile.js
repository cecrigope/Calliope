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
  MDBCardText
} from "mdbreact";
import SpotifyAPI from "spotify-web-api-js";

function UserProfile() {
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
        console.log(data);
        setArtists(data.items);
      });
    }
  }

  return (
    <div className="body">
      <MDBContainer>
        <MDBRow>
          {artists &&
            artists.map(artist => (
              <MDBCol className="artist-card" size={4}>
                <MDBCard>
                  <MDBCardImage
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

export default UserProfile;
