require("dotenv").config(); //file where keys are hidden

var keys = require("./keys.js");
var fs = require("fs"); //file system

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");


var concert = new concertThis(keys.concert);
// var bandsintown = require('bandsintown')(APP_ID);

//takes two arguments
//action (ie. 'concert-this', 'spotify-this-song', 'movie-this','do-what-it-says')
const action = process.argv[2];
//search term to be used in the action
const value = process.argv[3];

// console.log(Spotify);
// console.log(spotify);

// console.log(process.env.SPOTIFY_ID)/
// console.log(process.env.SPOTIFY_SECRET);

//switch cases for the actions
switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

        //instructions
    default:
        console.log("choose a command: concert-this, spotify-this-song, movie-this, or do-what-it-says");
};

function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        trackName = "The Sign";
    };
    songRequest = songName;
    spotify
        .search({
            type: 'track',
            query: songName,
            limit: 1
        })
        .then(function (response) {
            console.log(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });
}



function concertThis(artist) {

    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.concert;

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        }
    });
}