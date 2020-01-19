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
          <div className="flex flex-wrap mx-3">
            <div className="w-full">
              <h1 className="text-5xl text-primary mt-3">My Music Profile</h1>
            </div>
          </div>
          {user ? (
            <div>
              <h2 className="text-3xl text-white mx-3 mb-6">
                Welcome, {user.display_name}
              </h2>
              <div className="flex flex-wrap mx-3">
                <div className="w-full md:w-1/2 mb-6">
                  <h3 className="text-3xl text-accent-1">My Top Artists</h3>
                  {topArtists ? (
                    <div className="flex flex-wrap">
                      {topArtists.items.map((artist, i) => (
                        <div className="w-full my-4" key={i}>
                          <div className="flex flex-wrap">
                            <div className="w-1/4 md:w-2/12 flex">
                              <div className="self-center">
                                <img
                                  className="rounded-full border border-accent-1"
                                  src={artist.images[0].url}
                                />
                              </div>
                            </div>
                            <div className="w-3/4 md:w-10/12 pl-4 text-white flex">
                              <div className="self-center">
                                <h4 className="text-2xl text-accent-1">
                                  {artist.name}
                                </h4>
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
                <div className="w-full md:w-1/2 mb-6">
                  <h3 className="text-3xl text-accent-2">My Top Tracks</h3>
                  {topTracks ? (
                    <div className="flex flex-wrap">
                      {topTracks.items.map((track, i) => (
                        <div className="w-full my-4" key={i}>
                          <div className="flex flex-wrap">
                            <div className="w-1/4 md:w-2/12 flex">
                              <div className="self-center">
                                <img
                                  className="rounded-full border border-accent-2"
                                  src={track.album.images[0].url}
                                />
                              </div>
                            </div>
                            <div className="w-3/4 md:w-10/12 pl-4 text-white flex">
                              <div className="self-center">
                                <h4 className="text-2xl text-accent-2">
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
                  ) : (
                    <p>Nothing</p>
                  )}
                </div>
              </div>
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
