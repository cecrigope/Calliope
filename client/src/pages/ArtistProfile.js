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

function ArtistProfile() {
  const [artistData, setArtistData] = useState(false);
  const [lastFMData, setLastFMData] = useState(false);
  const [topTracksData, setTopTracksData] = useState(false);
  const [stats, setStats] = useState(false);

  var token = window.localStorage.getItem("spotifyToken");
  var artistId = window.location.pathname.substr(15);

  if (token !== "undefined") {
    var spotify = new SpotifyAPI();
    spotify.setAccessToken(token);

    if (artistData === false) {
      spotify.getArtist(artistId, function(err, artistData) {
        setArtistData(artistData);

        const lastfm = new LastFM("ac4f3251f9926f343c4fe14f0ef33a41");
        lastfm.artistInfo({ name: artistData.name }, function(err, lastFMData) {
          setLastFMData(lastFMData);
        });

        spotify.getArtistTopTracks(artistData.id, "US", function(
          err,
          topTracks
        ) {
          setTopTracksData(topTracks);
          var trackIds = _.map(topTracks.tracks, "id");

          spotify.getAudioFeaturesForTracks(trackIds, function(
            err,
            audioFeatures
          ) {
            var audioData = {
              acousticness:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "acousticness"),
                  x => x
                ) * 100),
              danceability:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "danceability"),
                  x => x
                ) * 100),
              energy:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "energy"),
                  x => x
                ) * 100),
              instrumentalness:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "instrumentalness"),
                  x => x
                ) * 100),
              liveness:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "liveness"),
                  x => x
                ) * 100),
              speechiness:
                Math.round(_.meanBy(
                  _.map(audioFeatures.audio_features, "speechiness"),
                  x => x
                ) * 100)
            };

            setStats(audioData);
          });
        });
      });
    }
  }

  function handleArtistProfile(artistId) {
    window.location.href = "/artistprofile/" + artistId;
  }
  
  return (
    <div>
      {artistData && lastFMData && topTracksData && stats && (
        <div>
          <MDBView>
            <img
              src={artistData.images[0].url}
              className="artist-bg"
              alt="Image of ballons flying over canyons with mask pattern one."
            />
            <MDBMask
              className="d-flex align-items-end"
              pattern={8}
              overlay="black-strong"
            >
              <MDBContainer>
                <h1 className="white-text display-3">{artistData.name}</h1>
                <h3
                  className="white-text body-text"
                  style={{ marginBottom: 16 }}
                >
                  Popularity Score: {artistData.popularity} | Followers:{" "}
                  {artistData.followers.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h3>
              </MDBContainer>
            </MDBMask>
          </MDBView>

          <MDBContainer className="body">
            <MDBRow>
              <MDBCol size={7}>
                <div style={{ marginBottom: 16 }}>
                  <MDBJumbotron className="z-depth-1">
                    <h1 className="jumbotron-title">Biography</h1>
                    <p>{lastFMData.summary}</p>
                  </MDBJumbotron>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <MDBJumbotron className="z-depth-1">
                    <h1 className="jumbotron-title">Artist Ratings</h1>
                    <MDBRow>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.acousticness}%</h1>
                          <h5>Acousticness</h5>
                        </MDBJumbotron>
                      </MDBCol>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.danceability}%</h1>
                          <h5>Danceability</h5>
                        </MDBJumbotron>
                      </MDBCol>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.energy}%</h1>
                          <h5>Energy</h5>
                        </MDBJumbotron>
                      </MDBCol>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.instrumentalness}%</h1>
                          <h5>Instrumentalness</h5>
                        </MDBJumbotron>
                      </MDBCol>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.liveness}%</h1>
                          <h5>Liveness</h5>
                        </MDBJumbotron>
                      </MDBCol>
                      <MDBCol size={6} className="text-center">
                        <MDBJumbotron className="jumbotron-rating z-depth-0">
                          <h1 className="display-1">{stats.speechiness}%</h1>
                          <h5>Speechiness</h5>
                        </MDBJumbotron>
                      </MDBCol>
                    </MDBRow>
                  </MDBJumbotron>
                </div>
              </MDBCol>
              <MDBCol size={5}>
                <div style={{ marginBottom: 16 }}>
                  <MDBJumbotron className="z-depth-1">
                    <h1 className="jumbotron-title">Top Tracks</h1>
                    <MDBListGroup>
                      {topTracksData.tracks.map(track => (
                        <MDBListGroupItem
                          style={{ textTransform: `capitalize` }}
                        >
                          {track.name}
                        </MDBListGroupItem>
                      ))}
                    </MDBListGroup>
                  </MDBJumbotron>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <MDBJumbotron className="z-depth-1">
                    <h1 className="jumbotron-title">Genres</h1>
                    <MDBListGroup>
                      {artistData.genres.map(genre => (
                        <MDBListGroupItem
                          style={{ textTransform: `capitalize` }}
                        >
                          {genre}
                        </MDBListGroupItem>
                      ))}
                    </MDBListGroup>
                  </MDBJumbotron>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <MDBJumbotron className="z-depth-1">
                    <h1 className="jumbotron-title">Similar Artists</h1>
                    <MDBListGroup>
                      {lastFMData.similar.map(artist => (
                        <MDBListGroupItem
                          style={{ textTransform: `capitalize` }}
                        >
                          {artist.name}
                        </MDBListGroupItem>
                      ))}
                    </MDBListGroup>
                  </MDBJumbotron>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </div>
  );
}

export default ArtistProfile;
