import React, { Component } from "react";

import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";

class TopTracks extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks
    } = await getUserInfo();
    this.setState(
      { user, followedArtists, playlists, topArtists, topTracks },
      function() {
        console.log(this.state);
      }
    );
  }

  render() {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks
    } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <div className="bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-5xl text-primary mx-3 my-3">
                My Top 50 Tracks
              </h1>
            </div>
          </div>
          {topTracks ? (
            <div className="flex flex-wrap pb-8">
              {topTracks.items.map((tracks, i) => (
                <div className="w-full" key={i}>
                  <div className="m-3">
                    <div className="overflow-hidden shadow-lg rounded-lg bg-card">
                      <div className="flex flex-wrap">
                        <div className="w-1/6">
                          <img src={tracks.album.images[0].url} alt="" />
                        </div>
                        <div className="w-5/6">
                          <div className="p-3 text-white">
                            <h1 className="text-3xl text-primary">
                              {tracks.name}
                            </h1>
                            <h1 className="pb-3 text-xl">
                              By {tracks.artists[0].name}
                            </h1>
                            <p>Popularity Score: {tracks.popularity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nothing</p>
          )}
        </div>
      </div>
    );
  }
}

export default TopTracks;
