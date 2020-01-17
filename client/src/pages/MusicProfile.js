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
  MDBMask,
  MDBView,
  MDBJumbotron,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import SpotifyAPI from "spotify-web-api-js";
import LastFM from "last-fm";
import _ from "lodash";

function MusicProfile() {
  const [user, setUser] = useState(false);
  const [stats, setStats] = useState(false);

  var token = window.localStorage.getItem("spotifyToken");

  if (token !== "undefined" && !user) {
    var spotify = new SpotifyAPI();
    spotify.setAccessToken(token);

    spotify.getMe(function(err, data) {
      setUser(data);
    });

    var options = {
      time_range: "long_term",
      limit: 50
    };

    spotify.getMyTopTracks(options, function(err, data) {
      var trackIds = _.map(data.items, "id");

      spotify.getAudioFeaturesForTracks(trackIds, function(err, trackData) {
        var audioData = {
          acousticness: Math.round(
            _.meanBy(_.map(trackData.audio_features, "acousticness"), x => x) *
              100
          ),
          danceability: Math.round(
            _.meanBy(_.map(trackData.audio_features, "danceability"), x => x) *
              100
          ),
          energy: Math.round(
            _.meanBy(_.map(trackData.audio_features, "energy"), x => x) * 100
          ),
          instrumentalness: Math.round(
            _.meanBy(
              _.map(trackData.audio_features, "instrumentalness"),
              x => x
            ) * 100
          ),
          liveness: Math.round(
            _.meanBy(_.map(trackData.audio_features, "liveness"), x => x) * 100
          ),
          speechiness: Math.round(
            _.meanBy(_.map(trackData.audio_features, "speechiness"), x => x) *
              100
          )
        };

        setStats(audioData);
      });
    });
  }

  console.log(user);
  console.log(stats);

  return (
    <div className="body">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h1 style={{ marginBottom: 16 }}>My Music Profile</h1>
          </MDBCol>
        </MDBRow>
        <MDBJumbotron>
          <MDBRow>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.acousticness}%</h1>
                <h5>Acousticness</h5>
              </MDBJumbotron>
            </MDBCol>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.danceability}%</h1>
                <h5>Danceability</h5>
              </MDBJumbotron>
            </MDBCol>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.energy}%</h1>
                <h5>Energy</h5>
              </MDBJumbotron>
            </MDBCol>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.instrumentalness}%</h1>
                <h5>Instrumentalness</h5>
              </MDBJumbotron>
            </MDBCol>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.liveness}%</h1>
                <h5>Liveness</h5>
              </MDBJumbotron>
            </MDBCol>
            <MDBCol size={4} className="text-center">
              <MDBJumbotron className="jumbotron-rating z-depth-0">
                <h1 className="display-1">{stats.speechiness}%</h1>
                <h5>Speechiness</h5>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBJumbotron>
      </MDBContainer>
    </div>
  );
}

export default MusicProfile;
