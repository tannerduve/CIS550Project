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


const search_rec = async function(req, res) {
  connection.query(`SELECT * FROM Recipes WHERE RecipeId = '${req.params.RecipeId}`, (err, data) => {
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