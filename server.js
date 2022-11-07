const path = require('path');
const routes = require('./routes');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');

// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Handlebars
const hbs = handlebars.create({});

//Session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Express routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => { console.log(`App listening at http://localhost:${PORT}`); });
});