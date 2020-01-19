import React from "react";

const LOGIN_URI = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://calliope-spotify.herokuapp.com/login';;

const HomePage = () => (
  <div className="home bg-dark">
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <h1 className="text-primary mb-8 text-5xl md:text-6xl">Calliope</h1>
          <a
            href={LOGIN_URI}
            className="bg-transparent hover:bg-primary text-primary hover:text-white border border-primary py-2 px-6 rounded-lg text-2xl uppercase"
          >
            Log In to Spotify
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
