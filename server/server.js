const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.post('/newuser', routes.newuser);
//app.get('/user/:username', routes.username);
app.get('/search', routes.search);
app.get('/random', routes.random);
app.get('/recipes', routes.recipes);
app.get('/top_recipes', routes.top_recipes);
//app.get('/user/:username/:likes', routes.user_likes);
app.get('/recipe/:RecipeId', routes.recipe_recid);
//app.post('/username/:newlikes', routes.user_likes);
app.get('/top_authors', routes.top_authors);
app.get('/user', routes.user);



app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
