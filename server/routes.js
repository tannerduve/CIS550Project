const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const home = async function(req, res) {
  connection.query(`SELECT * FROM Recipes WHERE RecipeId = '${req.params.RecipeId}'`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}


const search = async function(req, res) {
  connection.query(`SELECT * FROM Recipes WHERE RecipeId = '${req.params.RecipeId}`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

const search_songs = async function(req, res) {
  // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
  // Some default parameters have been provided for you, but you will need to fill in the rest
  const title = req.query.title ?? '';
  const durationLow = req.query.duration_low ?? 60;
  const durationHigh = req.query.duration_high ?? 660;
  const playsLow = req.query.plays_low ?? 0;
  const playsHigh = req.query.plays_high ?? 1100000000;
  const danceabilityLow = req.query.danceability_low ?? 0;
  const danceabilityHigh = req.query.danceability_low ?? 1;
  const energyLow = req.query.energy_low ?? 0;
  const energyHigh = req.query.energy_high ?? 1;
  const valenceLow = req.query.valence_low ?? 0;
  const valenceHigh = req.query.valence_high ?? 1;
  const explicit = req.query.explicit === 'true' ? 1 : 0;

  connection.query(`SELECT album_id, danceability, duration, energy, explicit, key_mode, number, plays, song_id, tempo, title, valence FROM Songs 
  WHERE title LIKE '%${title}%' AND duration >= ${durationLow} AND duration <= ${durationHigh} AND 
  plays >= ${playsLow} AND plays <= ${playsHigh} AND danceability >= ${danceabilityLow} AND danceability <= ${danceabilityHigh}
  AND energy >= ${energyLow} AND energy <= ${energyHigh} AND valence >= ${valenceLow} AND valence <= ${valenceHigh} AND explicit <= ${explicit}
  ORDER BY title ASC`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

const search_rec = async function(req, res) {

  const CookTimeLow = req.query.cooktime_low ?? 0; 
  const CookTimeHigh = req.query.cooktime_high ?? 11358720; 
  const PrepTimeLow = req.query.preptime_low ?? 0; 
  const PrepTimeHigh = req.query.preptime_high ?? 525600; 
  const TotalTimeLow = req.query.totaltime_low ?? 0; 
  const TotalTimeHigh = req.query.totaltime_high ?? 11394720; 
  const SaturatedFatContentLow = req.query.saturatedfatcontent_low ?? 0;
  const SaturatedFatContentHigh = req.query.saturatedfatcontent_high ?? 841.9;
  const CholesterolContentLow = req.query.CholesterolContentLow ?? 0;
  const CholesterolContentHigh = req.query.plays_high ?? 9167.2;
  const SodiumContentLow = req.query.danceability_low ?? 0;
  const SodiumContentHigh = req.query.danceability_low ?? 704129.6;
  const CarbohydrateContentLow = req.query.energy_low ?? 0;
  const CarbohydrateContentHigh = req.query.energy_high ?? 4320.9;
  const FiberContentLow = req.query.valence_low ?? 0;
  const FiberContentHigh = req.query.valence_low ?? 835.7;
  const SugarContentLow = req.query.valence_high ?? 0;
  const SugarContentHigh = req.query.valence_high ?? 3623.9;


  connection.query(`SELECT * FROM Recipes WHERE `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}


const likes_user = async function(req, res) {
  connection.query(`SELECT * FROM Likes l JOIN Recipes r ON l.RecipeId = r.RecipeID WHERE l.Username = '${req.params.Username}`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}


const likes = async function(req, res) {
  connection.query(`SELECT * FROM Likes l JOIN Recipes r ON l.RecipeId = r.RecipeID WHERE r.RecipeID = '${req.params.RecipeID}`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}




module.exports = {
  home,
  signup,
  signup_login,
  search,
  search_rec,
  likes_user,
  likes,
}