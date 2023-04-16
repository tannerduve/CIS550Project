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

//can this be constant?? like no
const signup = async function(req, res) {
  connection.query(`SELECT * FROM Recipes WHERE RecipeId = '${req.params.RecipeId}'`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

//can this be constant?? like no
const signup_login = async function(req, res) {
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

const search_rec = async function(req, res) {

  const Name = req.query.Name ?? '';
  const Description = req.query.Description ?? '';
  const CookTimeLow = req.query.CookTime_low ?? 0; 
  const CookTimeHigh = req.query.CookTime_high ?? 11358720; 
  const PrepTimeLow = req.query.PrepTime_low ?? 0; 
  const PrepTimeHigh = req.query.PrepTime_high ?? 525600; 
  const TotalTimeLow = req.query.TotalTime_low ?? 0; 
  const TotalTimeHigh = req.query.TotalTime_high ?? 11394720; 
  const SaturatedFatContentLow = req.query.SaturatedFatContent_low ?? 0;
  const SaturatedFatContentHigh = req.query.SaturatedFatContent_high ?? 841.9;
  const CholesterolContentLow = req.query.CholesterolContent_low ?? 0;
  const CholesterolContentHigh = req.query.CholesterolContent_high ?? 9167.2;
  const SodiumContentLow = req.query.SodiumContent_low ?? 0;
  const SodiumContentHigh = req.query.SodiumContent_high ?? 704129.6;
  const CarbohydrateContentLow = req.query.CarbohydrateContent_low ?? 0;
  const CarbohydrateContentHigh = req.query.CarbohydrateContent_high ?? 4320.9;
  const FiberContentLow = req.query.FiberContent_low ?? 0;
  const FiberContentHigh = req.query.FiberContent_high ?? 835.7;
  const SugarContentLow = req.query.SugarContent_low ?? 0;
  const SugarContentHigh = req.query.SugarContent_high ?? 3623.9;
  const ProteinContentLow = req.query.SugarContent_low ?? 0;
  const ProteinContentHigh = req.query.SugarContent_high ?? 1803;
  const RecipeServingsLow = req.query.RecipeServings_low ?? 0;
  const RecipeServingsHigh = req.query.RecipeServings_high ?? 32767;
  const RecipeYieldLow = req.query.RecipeYield_low ?? 0;
  const RecipeYieldHigh = req.query.RecipeYield_high ?? 100;
  const IngredientsCountLow = req.query.IngredientsCount_low ?? 0;
  const IngredientsCountHigh = req.query.IngredientsCount_high ?? 39;

  connection.query(`SELECT * FROM Recipes WHERE Name LIKE '%${Name}%' AND Description LIKE '%${Description}%' 
  AND CookTime >= ${CookTimeLow} AND CookTime <= ${CookTimeHigh} 
  AND PrepTime >= ${PrepTimeLow} AND PrepTime <= ${PrepTimeHigh} 
  AND TotalTime >= ${TotalTimeLow} AND TotalTime <= ${TotalTimeHigh}
  AND SaturatedFatContent >= ${SaturatedFatContentLow} AND SaturatedFatContent <= ${SaturatedFatContentHigh} 
  AND CholesterolContent >= ${CholesterolContentLow} AND CholesterolContent <= ${CholesterolContentHigh}
  AND SodiumContent >= ${SodiumContentLow} AND SodiumContent <= ${SodiumContentHigh}
  AND CarbohydrateContent >= ${CarbohydrateContentLow} AND CarbohydrateContent <= ${CarbohydrateContentHigh}
  AND FiberContent >= ${FiberContentLow} AND FiberContent <= ${FiberContentHigh}
  AND SugarContent >= ${SugarContentLow} AND SugarContent <= ${SugarContentHigh}
  AND ProteinContent >= ${ProteinContentLow} AND ProteinContent <= ${ProteinContentHigh}
  AND RecipeServings >= ${RecipeServingsLow} AND RecipeServings <= ${RecipeServingsHigh}
  AND RecipeYield >= ${RecipeYieldLow} AND RecipeYield <= ${RecipeYieldHigh}
  AND IngredientsCount >= ${IngredientsCountLow} AND IngredientsCount <= ${IngredientsCountHigh}`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
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