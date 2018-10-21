require("dotenv").config(); //file where keys are hidden

var keys = require("./keys.js");
var fs = require("fs"); //file system
var moment = require('moment');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");




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

function spotifyThisSong() {
    var songName = process.argv[3];
    if (!songName) {
        trackName = "The Sign";
    };
    
    spotify
        .search({
            type: 'track',
            query: songName,
            limit: 1
        })
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Preview Url: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log(err);
        });
}



function concertThis() {

    var artist = process.argv[3];
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.concert.app_id;

    request(queryUrl, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        // If the request is successful
        if (!error && response.statusCode === 200) {
           const concerts = JSON.parse(body); 
           console.log(concerts);
           for (i=0; i < concerts.length; i++){
               console.log("Venue: " + concerts[i].venue.name);
               console.log("Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country);
               console.log("Date: " + moment(concerts[i].datetime).format("MM/DD/YYYY"));
           } 
        
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        }
    });
}

function movieThis(){
    const movie = process.argv[3];

    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.movie.apikey;
    
    request(queryUrl, function(error, response, body) {
        
        let movieInfo = JSON.parse(body);
        console.log(movieInfo);
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("Title: " + movieInfo.Title);// * Title of the movie.
            console.log("Year: " + movieInfo.Year);// * Year the movie came out.
            console.log("IMDB rating: " + movieInfo.imdbRating);// * IMDB Rating of the movie.
            console.log("Rotten Rating: " + movieInfo.Ratings[1].Value);// * Rotten Tomatoes Rating of the movie.
            console.log("Country: " + movieInfo.Country);// * Country where the movie was produced.
            console.log("Language: " + movieInfo.Language);// * Language of the movie.
            console.log("Plot: " + movieInfo.Plot);// * Plot of the movie.
            console.log("Actors: " + movieInfo.Actors);// * Actors in the movie.





          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        
        }
      });
}