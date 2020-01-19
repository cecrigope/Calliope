import React, { Component } from "react";

import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";

class MusicProfile extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
    artistNumber: 10,
    trackNumber: 50
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

  async showMoreArtists(boolVal) {
    if (boolVal) {
      this.setState({ artistNumber: 50 });
    } else {
      this.setState({ artistNumber: 10 });
    }
  }

  async showMoreTracks(boolVal) {
    if (boolVal) {
      this.setState({ trackNumber: 50 });
    } else {
      this.setState({ trackNumber: 10 });
    }
  }

  async getToTop() {
    window.scrollTo(0, 0);
  }

  showArtists = boolVal => catchErrors(this.showMoreArtists(boolVal));
  showTracks = boolVal => catchErrors(this.showMoreTracks(boolVal));
  scrollToTop = () => catchErrors(this.getToTop());

  render() {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks,
      artistNumber,
      trackNumber
    } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <div>
        <div className="bg-dark static">
          <div className="container mx-auto">
            <div className="flex flex-wrap mx-3">
              <div className="w-full">
                <h1 className="text-5xl text-primary mt-3">My Music Profile</h1>
              </div>
            </div>
            {user ? (
              <div>
                <h2 className="text-3xl text-white mx-3 mb-4">
                  Welcome, {user.display_name}!
                </h2>
                <div className="flex flex-wrap mx-3">
                  <div className="w-full md:w-1/2 mb-4">
                    <div className="flex flex-wrap">
                      <div className="w-1/2">
                        <h3 className="text-3xl text-accent-1">
                          My Top {artistNumber} Artists
                        </h3>
                      </div>
                      <div className="w-1/2">
                        <button
                          className="bg-transparent hover:bg-accent-1 text-accent-1 hover:text-white border border-accent-1 py-1 px-2 rounded-lg text-xs uppercase float-right md:mr-4"
                          onClick={() =>
                            this.showArtists(artistNumber === 10 ? true : false)
                          }
                        >
                          {artistNumber === 10 ? "Show More" : "Show Less"}
                        </button>
                      </div>
                    </div>
                    {topArtists ? (
                      <div className="flex flex-wrap">
                        {topArtists.items
                          .slice(0, artistNumber)
                          .map((artist, i) => (
                            <div className="w-full my-4" key={i}>
                              <div className="flex flex-wrap">
                                <div className="w-1/4 md:w-2/12 flex">
                                  <div className="self-center">
                                    <img
                                      className="rounded-full rounded-custom border border-accent-1"
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
                  <div className="w-full md:w-1/2 mb-4">
                    <div className="flex flex-wrap">
                      <div className="w-1/2">
                        <h3 className="text-3xl text-accent-2">
                          My Top {trackNumber} Tracks
                        </h3>
                      </div>
                      <div className="w-1/2">
                        <button
                          className="bg-transparent hover:bg-accent-2 text-accent-2 hover:text-white border border-accent-2 py-1 px-2 rounded-lg text-xs uppercase float-right md:mr-4"
                          onClick={() =>
                            this.showTracks(trackNumber === 10 ? true : false)
                          }
                        >
                          {trackNumber === 10 ? "Show More" : "Show Less"}
                        </button>
                      </div>
                    </div>
                    {topTracks ? (
                      <div className="flex flex-wrap">
                        {topTracks.items
                          .slice(0, trackNumber)
                          .map((track, i) => (
                            <div className="w-full my-4" key={i}>
                              <div className="flex">
                                <div className="w-1/4 md:w-2/12 flex">
                                  <div className="self-center">
                                    <img
                                      className="rounded-full rounded-custom border border-accent-2"
                                      src={track.album.images[0].url}
                                    />
                                  </div>
                                </div>
                                <div className="w-3/4 md:w-10/12 pl-4 text-white flex" style={{display: "table"}}>
                                  <div className="self-center">
                                    <h4 className="text-2xl text-accent-2 overflow-custom">
                                      {track.name}
                                    </h4>
                                    <p>
                                      {track.artists.length > 1
                                        ? track.artists.map((artist, index) =>
                                            index + 1 === track.artists.length
                                              ? artist.name
                                              : index + 2 ===
                                                track.artists.length
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
        <div
          class="fixed bottom-0 right-0 m-4 p-2 rounded rounded-lg bg-gray-600"
          onClick={() => this.scrollToTop()}
        >
          <p className="uppercase text-white text-sm">Return to Top</p>
        </div>
      </div>
    );
  }
}

export default MusicProfile;
