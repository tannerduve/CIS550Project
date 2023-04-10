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
app.get('/home', routes.home);
app.push('/signup', routes.signup);
app.get('/signup/:login', routes.signup_login);
app.get('/search', routes.search);
app.get('/search/:recipeid', routes.search_rec);
app.get('/likes/:username', routes.likes_user);
app.push('/likes', routes.likes);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
