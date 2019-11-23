# calliope

## Getting Started
1) Spotify API
- Visit https://developer.spotift.com/
- Go to DASHBOARD and login
- Click on CREATE A CLIENT ID
- Fill out the form:
  - App or Hardware Name: Calliope
  - App or Hardware Description: React application to view user's spotify data
  - What are you building? Website
  - Are you developing a commercial integration? No
  - Acknowledge 
- Click on EDIT SETTINGS
  - Add "http://localhost:8888/callback" to the Redirect URIs
  - Save
- Save your Client ID, Client Secret and Redirect URI (you'll need it later)

2) Start Auth Sever
- Go to the AUTH-SERVER directory
- Run npm install .
- Create a "env.js" file in side the auth-server directory
  - module.exports.client_id = "YOUR CLIENT ID GOES HERE";
  - module.exports.client_secret = "YOUR CLIENT SECRET GOES HERE";
  - module.exports.redirect_uri = "YOUR REDIRECT URI GOES HERE";
- Run node app inside the auth-server directory

3) Start Client
- Go to the CLIENT directory
- Run npm install .
- Run npm start

4) Run application
- Visit http://localhost:3000
