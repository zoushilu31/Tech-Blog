const express = require('express');
const routes = require('./controllers');
// const postroutes = require('./controllers/api/post-routes');
const sequelize = require('./config/connection');

// Javascript Helpers
const helpers = require('./utils/helpers');

// Require Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// Use path to target static files
const path = require('path');

// Use Environment port or 3001
const app = express();
const PORT = process.env.PORT || 3001;

// Create a Session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  // Session expires after 5 minutes of inactivity
  cookie: {expires: 60000},
  resave: true,
  rolling: true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

// Set Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Connect Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Load Database
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// turn on routes
app.use(routes);
// app.use(postroutes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
