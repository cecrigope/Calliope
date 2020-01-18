import React, { Component } from "react";

import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";

class MusicProfile extends Component {
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
              <h1 className="text-5xl text-primary mx-3 my-3">Music Profile</h1>
            </div>
          </div>
          {topArtists ? (
            <div className="flex flex-wrap pb-8">
              {topArtists.items.map((artist, i) => (
                <div className="w-full md:w-1/3 lg:w-1/4" key={i}>
                  <div className="m-3">
                    <div className="overflow-hidden shadow-lg rounded-lg bg-card">
                      <img className="artist-img" src={artist.images[0].url} />
                      <div className="p-3 text-white">
                        <h1 className="text-4xl text-primary pb-3">
                          {artist.name}
                        </h1>
                        <p>Popularity Score: {artist.popularity}</p>
                        <p>
                          Followers:{" "}
                          {artist.followers.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
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

export default MusicProfile;
