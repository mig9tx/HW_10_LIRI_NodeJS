console.log('\nthis is loaded\n');
//tells keys.js where the keys are located locally on .env file
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.concert = {
    app_id: process.env.BANDS_KEY 
}

exports.movie = {
    apikey: process.env.OMDB_KEY 
}