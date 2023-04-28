const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.post('/newuser', jsonParser, routes.newuser);
app.post('/login', jsonParser, routes.login);
app.get('/search', routes.search);
app.get('/reviews', routes.reviews);
app.get('/random', routes.random);
app.get('/recipes', routes.recipes);
app.get('/top_recipes', routes.top_recipes);
//app.get('/user/:username/:likes', routes.user_likes);
app.get('/likes', routes.user_likes);
app.get('/recipe/:RecipeId', routes.recipe_recid);
//app.post('/username/:newlikes', routes.user_likes);
app.get('/top_authors', routes.top_authors);
app.get('/user', routes.user);
app.get('/author/:AuthorId', routes.author);
app.get('/author_reviews/:AuthorId', routes.author_reviews);





app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/login`)
});

module.exports = app;
