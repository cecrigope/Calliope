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
import _ from "lodash";

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
        var trackIds = _.map(data.items, "id");

        spotify.getAudioFeaturesForTracks(trackIds, function(err, trackData) {
          var merge = _.merge(data.items, trackData.audio_features);
          setTracks(merge);
        });
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
                <div className="card" style={{ marginBottom: 16 }}>
                  <div className="row no-gutters">
                    <div className="col-lg-3 col-md-4" style={{ background: `#868e96` }}>
                      <img
                        src={track.album.images[0].url}
                        className="card-img-top h-100 card-img-track"
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <div className="card-body">
                        <h2 className="card-title">{track.name}</h2>
                        <div className="card-text">
                          <div className="row no-gutters">
                            <div className="col-md-6 col-sm-12">
                              <p className="no-margin">
                                <span className="primary-text">
                                  {track.artists.length > 1
                                    ? "Artists"
                                    : "Artist"}
                                  :{" "}
                                </span>
                                {track.artists.length > 1
                                  ? track.artists.map((artist, index) =>
                                      index + 1 === track.artists.length
                                        ? artist.name
                                        : artist.name + ", "
                                    )
                                  : track.artists[0].name}
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">Album: </span>
                                {track.album.name}
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">
                                  Popularity Score:
                                </span>{" "}
                                {track.popularity}
                              </p>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <p className="no-margin">
                                <span className="primary-text">
                                  Acousticness:{" "}
                                </span>
                                {Math.round(track.acousticness * 100)}%
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">
                                  Danceability:{" "}
                                </span>
                                {Math.round(track.danceability * 100)}%
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">Energy: </span>
                                {Math.round(track.energy * 100)}%
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">
                                  Instrumentalness:{" "}
                                </span>
                                {Math.round(track.instrumentalness * 100)}%
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">Liveness: </span>
                                {Math.round(track.liveness * 100)}%
                              </p>
                              <p className="no-margin">
                                <span className="primary-text">
                                  Speechiness:{" "}
                                </span>
                                {Math.round(track.speechiness * 100)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default TopTracks;
