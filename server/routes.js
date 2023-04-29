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

// GET /user
// Will change this, just using for testing
const user = async function (req, res) {
  const username = 'ryboyle';
  res.send(`Logged in as user: ${username}`);
}

const random = async function (req, res) {
  connection.query(`
    SELECT * 
    FROM Recipes 
    ORDER BY RAND()
    LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({
        RecipeId: data[0].RecipeId,
        Name: data[0].Name
      });
    }
  });
}


//Route : POST /newuser
const newuser = async function (req, res) {
  console.log(req.body);
  const { username, password } = req.body;

  connection.query(`
    INSERT INTO Users
    VALUES ('${username}', '${password}')
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.status(401).send(`Username "${username}" is unavailable, please try another.`);
    } else {
      res.send(`Account successfully created for user "${username}"!`);
    }
  });
}


//ROUTE: POST /login
const login = async function(req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  connection.query(`
    SELECT Username, Password 
    FROM Users
    WHERE Username = '${username}'
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Server error');
    } else if (data.length !== 1) {
      console.log('Data Length Error');
      res.status(401).send('Invalid Username');
    } else if (data[0].Password !== password) {
      console.log('Incorrect Password Error');
      console.log(data[0]);
      res.status(401).send('Invalid Password');
    } else {
      res.status(200).json(data[0]);
    }
  });
}
//ROUTE: POST /newlikes
const newlikes = async function(req, res) {
  console.log(req.body);
  const { username, RecipeID } = req.body;
  connection.query(`
    INSERT INTO Likes
    VALUES ('${username}', '${RecipeID}')
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.status(401).send(`Recipe has already been added to likes.`);
    } else {
      res.send(`${RecipeID} added to likes!`);
    }
  });
}
const search = async function (req, res) {

  const Name = req.query.Name ?? '';
  const Description = req.query.Description ?? '';
  const CookTimeLow = req.query.CookTime_low ?? 0;
  const CookTimeHigh = req.query.CookTime_high ?? 100;
  const PrepTimeLow = req.query.PrepTime_low ?? 0;
  const PrepTimeHigh = req.query.PrepTime_high ?? 960;
  const TotalTimeLow = req.query.TotalTime_low ?? 0;
  const TotalTimeHigh = req.query.TotalTime_high ?? 990;
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
  const ProteinContentLow = req.query.ProteinContent_low ?? 0;
  const ProteinContentHigh = req.query.ProteinContent_high ?? 1802.9;
  const RecipeServingsLow = req.query.RecipeServings_low ?? 0;
  const RecipeServingsHigh = req.query.RecipeServings_high ?? 360;
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

const user_likes = async function (req, res) {
  const Username = req.query.Username ?? '';
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
      SELECT * 
      FROM Likes l 
      JOIN Recipes r ON l.RecipeId = r.RecipeId 
      WHERE l.Username = '${Username}'
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // reimplement with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    const offset = pageSize * (page - 1);
    connection.query(`
      SELECT * 
      FROM Likes l 
      JOIN Recipes r ON l.RecipeId = r.RecipeId 
      WHERE l.Username = '${Username}'
      LIMIT ${pageSize}
      OFFSET ${offset}
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }

}

// Route: GET /recipes
const recipes = async function (req, res) {
  connection.query(`SELECT * FROM Recipes ORDER BY Name DESC`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route: GET /top_recipes
const top_recipes = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
      WITH recipe_likes AS (
        SELECT RecipeId, COUNT(Username) AS TotalLikes
        FROM Likes
        GROUP BY RecipeId
      ), recipe_ratings AS (
        SELECT RecipeId, AVG(Rating) AS AverageRating
        FROM Reviews
        GROUP BY RecipeId
      )
      SELECT r.RecipeId, r.Name, r.AuthorId, r.AuthorName, r.RecipeCategory, rr.AverageRating, rl.TotalLikes
      FROM Recipes r
      JOIN recipe_likes rl ON r.RecipeId = rl.RecipeId
      JOIN recipe_ratings rr ON r.RecipeId = rr.RecipeId
      ORDER BY rr.AverageRating DESC, rl.TotalLikes DESC
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // reimplement with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    const offset = pageSize * (page - 1);
    connection.query(`
      WITH recipe_likes AS (
        SELECT RecipeId, COUNT(Username) AS TotalLikes
        FROM Likes
        GROUP BY RecipeId
      ), recipe_ratings AS (
        SELECT RecipeId, AVG(Rating) AS AverageRating
        FROM Reviews
        GROUP BY RecipeId
      )
      SELECT r.RecipeId, r.Name, r.AuthorId, r.AuthorName, r.RecipeCategory, rr.AverageRating, rl.TotalLikes
      FROM Recipes r
      JOIN recipe_likes rl ON r.RecipeId = rl.RecipeId
      JOIN recipe_ratings rr ON r.RecipeId = rr.RecipeId
      ORDER BY rr.AverageRating DESC, rl.TotalLikes DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}

// Route: GET /top_authors
const top_authors = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
      WITH recipe_likes AS (
        SELECT RecipeId, COUNT(Username) AS TotalLikes
        FROM Likes
        GROUP BY RecipeId
      )
      SELECT a.AuthorId, a.AuthorName, AVG(r.Rating) AS AverageRecipeRating, SUM(l.TotalLikes) AS TotalRecipeLikes
      FROM Recipes a
      JOIN Reviews r ON a.RecipeId = r.RecipeId
      JOIN recipe_likes l ON a.RecipeId = l.RecipeId
      GROUP BY a.AuthorId, a.AuthorName
      ORDER BY AVG(r.Rating) DESC, SUM(l.TotalLikes) DESC
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // reimplement with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    const offset = pageSize * (page - 1);
    connection.query(`
      WITH recipe_likes AS (
        SELECT RecipeId, COUNT(Username) AS TotalLikes
        FROM Likes
        GROUP BY RecipeId
      )
      SELECT a.AuthorId, a.AuthorName, AVG(r.Rating) AS AverageRecipeRating, l.TotalLikes AS TotalRecipeLikes
      FROM Recipes a
      JOIN Reviews r ON a.RecipeId = r.RecipeId
      JOIN recipe_likes l ON a.RecipeId = l.RecipeId
      GROUP BY a.AuthorId, a.AuthorName, l.TotalLikes
      ORDER BY AVG(r.Rating) DESC, l.TotalLikes DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}

//reviews Route
const reviews = async function (req, res) {
  const RecipeName = req.query.RecipeName ?? '';
  const AuthorName = req.query.AuthorName ?? '';
  const Review = req.query.Review ?? '';
  const Rating = req.query.Rating ?? '';

  connection.query(`
  SELECT * 
  FROM Reviews 
  JOIN Recipes ON Reviews.RecipeId = Recipes.RecipeId
  WHERE Recipes.Name LIKE '%${RecipeName}%' 
  AND Reviews.AuthorName LIKE '%${AuthorName}%' 
  AND Reviews.Review LIKE '%${Review}%' 
  AND Reviews.Rating LIKE '%${Rating}%'`, (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}

const recipe_recid = async function (req, res) {
  connection.query(`
    SELECT * 
    FROM Recipes
    WHERE RecipeID = ${req.params.RecipeId}
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

const author = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
      SELECT RecipeId, Name, AuthorId, AuthorName, RecipeCategory
      FROM Recipes r
      WHERE AuthorId = ${req.params.AuthorId}
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // reimplement with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    const offset = pageSize * (page - 1);
    connection.query(`
      SELECT RecipeId, Name, AuthorId, AuthorName, RecipeCategory
      FROM Recipes r
      WHERE AuthorId = ${req.params.AuthorId}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}

const author_reviews = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;

  if (!page) {
    connection.query(`
      SELECT r.RecipeId, r.Name, r.AuthorId, r.AuthorName, r.RecipeCategory, a.Review, a.Rating
      FROM Reviews a
      JOIN Recipes r ON a.RecipeId = r.RecipeId
      WHERE r.AuthorId = ${req.params.AuthorId}
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    // reimplement with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    const offset = pageSize * (page - 1);
    connection.query(`
      SELECT r.RecipeId, r.Name, r.AuthorId, r.AuthorName, r.RecipeCategory, a.Review, a.Rating
      FROM Reviews a
      JOIN Recipes r ON a.RecipeId = r.RecipeId
      WHERE r.AuthorId = ${req.params.AuthorId}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `, (err, data) => {
      if (err) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}

const recipe_reviews = async function (req, res) {
  connection.query(`
    SELECT * 
    FROM Reviews
    WHERE RecipeID = ${req.params.RecipeId}
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
}


module.exports = {
  user,
  newuser,
  login,
  search,
  reviews,
  random,
  recipes,
  top_recipes,
  user_likes,
  newlikes,
  recipe_recid,
  top_authors,
  author,
  author_reviews,
  recipe_reviews
}