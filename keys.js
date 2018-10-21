console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.concert = {
    app_id: 'codingbootcamp',
}

exports.movie = {
    apikey: 'trilogy',
}