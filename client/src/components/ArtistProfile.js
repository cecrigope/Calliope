import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Chart from "chart.js";

import {
  getArtist,
  getArtistTopTracks,
  getAudioFeaturesForTracks,
  logout
} from "../spotify";
import { catchErrors } from "../utils";

class ArtistProfile extends Component {
  static propTypes = {
    artistId: PropTypes.string
  };

  state = {
    artist: null,
    topTracks: null,
    stats: null
  };

  componentDidMount() {
    catchErrors(this.getData());
    catchErrors(this.getTopTracks());
  }

  async getData() {
    const { artistId } = this.props;
    const { data } = await getArtist(artistId);
    this.setState({ artist: data });
  }

  async getTopTracks() {
    const { artistId } = this.props;
    const { data } = await getArtistTopTracks(artistId);
    this.setState({ topTracks: data });

    var trackIds = _.map(data.tracks, "id");

    const audioFeatures = await getAudioFeaturesForTracks(trackIds);

    var audioData = {
      acousticness: Math.round(
        _.meanBy(
          _.map(audioFeatures.data.audio_features, "acousticness"),
          x => x
        ) * 100
      ),
      danceability: Math.round(
        _.meanBy(
          _.map(audioFeatures.data.audio_features, "danceability"),
          x => x
        ) * 100
      ),
      energy: Math.round(
        _.meanBy(_.map(audioFeatures.data.audio_features, "energy"), x => x) *
          100
      ),
      instrumentalness: Math.round(
        _.meanBy(
          _.map(audioFeatures.data.audio_features, "instrumentalness"),
          x => x
        ) * 100
      ),
      liveness: Math.round(
        _.meanBy(_.map(audioFeatures.data.audio_features, "liveness"), x => x) *
          100
      ),
      speechiness: Math.round(
        _.meanBy(
          _.map(audioFeatures.data.audio_features, "speechiness"),
          x => x
        ) * 100
      )
    };

    this.setState({ stats: audioData });
    this.createRadar(audioData);
  }

  createRadar = stats => {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Acousticness",
          "Danceability",
          "Energy",
          "Instrumentalness",
          "Liveness",
          "Speechiness"
        ],
        datasets: [
          {
            data: [
              stats.acousticness,
              stats.danceability,
              stats.energy,
              stats.instrumentalness,
              stats.liveness,
              stats.speechiness
            ],
            fill: true,
            backgroundColor: "rgba(255, 0, 102, 0.25)",
            borderColor: "rgba(255, 0, 102, 1)",
            borderWidth: 3
          }
        ]
      },
      options: {
        scale: {
          gridLines: {
            color: "rgba(255, 255, 255, 1)"
          },
          angleLines: {
            color: "rgba(255, 255, 255, 1)"
          },
          pointLabels: {
            fontColor: "rgba(255, 255, 255, 1)",
            fontFamily: "body-font",
            fontSize: 14
          },
          ticks: {
            fontColor: "rgba(255, 255, 255, 1)",
            backdropColor: "rgba(29, 38, 47, 1)",
            fontFamily: "body-font",
            fontSize: 14
          }
        },
        legend: {
          display: false
        }
      }
    });
  };

  render() {
    const { artist, topTracks, stats } = this.state;

    console.log(stats);

    return (

      <div className="bg-dark static">
        {artist && topTracks ? (
          <div>
            <div
              className="artist-img"
              style={{
                backgroundImage: `url(${artist.images[0].url})`,
                backgroundPosition: `50% 50%`,
                backgroundAttachment: `fixed`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`
              }}
            >
              <div className="overlay-primary flex items-end">
                <div className="container mx-auto pb-5 px-3 md:px-1 text-white">
                  <h1 className="text-6xl">{artist.name}</h1>
                  <h1 className="text-xl">
                    Popularity Score: {artist.popularity}
                  </h1>
                  <h1 className="text-xl">
                    Followers:
                    {artist.followers.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h1>
                </div>
              </div>
            </div>
            <div className="container mx-auto pt-5 pb-8">
              <div className="flex flex-wrap mx-1">
                <div className="w-full md:w-2/3 pr-0 md:pr-5">
                  <h2 className="text-primary text-5xl mb-2">Biography</h2>
                  <p className="text-white mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla pharetra nisi id enim interdum vulputate. Vestibulum
                    vulputate ultrices enim et consequat. Praesent consectetur
                    ultrices lacus, ut porttitor nunc accumsan non. Nulla
                    aliquam ultrices mi eu lacinia. Duis tristique, sem quis
                    luctus porta, tellus lorem venenatis sem, non volutpat nisi
                    orci mattis erat. Suspendisse vel malesuada metus.
                    Suspendisse consectetur, nunc sit amet suscipit dignissim,
                    ligula tortor euismod lacus, sed mattis nisl lacus id augue.
                    Quisque id mauris ut odio tempor ornare. Nulla interdum
                    posuere venenatis. Vestibulum tempor dapibus nisi, vitae
                    imperdiet felis vulputate sed. Sed finibus metus bibendum
                    orci dignissim, vitae semper urna sagittis.Donec lacinia
                    porttitor dui, ac rhoncus augue fringilla eget. Cras
                    placerat et metus at sagittis. Curabitur magna velit,
                    fringilla eu sodales euismod, elementum quis orci. Aliquam
                    non libero convallis, eleifend lectus sed, vestibulum risus.
                    Integer a nisi in arcu suscipit scelerisque non eu ligula.
                    Nunc iaculis viverra nunc quis aliquet. Quisque dignissim
                    posuere erat a lobortis. Quisque ut sodales sapien. Maecenas
                    posuere sit amet massa sed elementum. Duis blandit, augue ut
                    semper commodo, orci ex convallis magna, aliquam efficitur
                    tortor nulla non nisi.
                  </p>
                  <h2 className="text-primary text-5xl mb-2">Statistics</h2>
                  <canvas id="myChart" width="400" height="400"></canvas>
                </div>
                <div className="w-full md:w-1/3">
                  <h2 className="text-primary text-5xl mb-2">Genres</h2>
                  <div className="mb-4">
                    {artist.genres.map((genre, i) => (
                      <p className="text-white capitalize" key={i}>
                        {genre}
                      </p>
                    ))}
                  </div>
                  <h2 className="text-primary text-5xl mb-2">Top Tracks</h2>
                  <div className="mb-4">
                    {topTracks.tracks.map((track, i) => (
                      <div className="w-full my-4" key={i}>
                        <div className="flex">
                          <div className="w-1/4 md:w-3/12 flex">
                            <div className="self-center">
                              <img
                                className="rounded-full rounded-custom border border-primary"
                                src={track.album.images[0].url}
                              />
                            </div>
                          </div>
                          <div className="w-3/4 md:w-9/12 pl-4 text-white flex">
                            <div className="self-center">
                              <h4 className="text-2xl text-primary overflow-custom">
                                {track.name}
                              </h4>
                              <p>
                                {track.artists.length > 1
                                  ? track.artists.map((artist, index) =>
                                      index + 1 === track.artists.length
                                        ? artist.name
                                        : index + 2 === track.artists.length
                                        ? artist.name + ", and "
                                        : artist.name + ", "
                                    )
                                  : track.artists[0].name}
                              </p>
                              <p>{track.album.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Nothing</p>
        )}
      </div>
    );
  }
}

export default ArtistProfile;
