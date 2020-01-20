require("dotenv").config();

import axios from "axios";

const OAUTH_SIGNATURE = process.env.OAUTH_SIGNATURE;
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;

export const getArtistId = artistName => {
  console.log(
    axios.get(
      `http://api.music-story.com/en/artist/search?oauth_signature=${OAUTH_SIGNATURE}&oauth_token=${OAUTH_TOKEN}&name=${artistName}`
    )
  );
};
