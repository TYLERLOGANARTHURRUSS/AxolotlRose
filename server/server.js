if (process.evv.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple');
const passport = require('passport');
const LocalStrategy = require('passport-local').streategy;
const { disconnect, nextTick } = require('process');
const db = require('pg');
const userController = require('./controllers/userController')
const app = express();

const initializePassport = require('./passport-config')

initializePassport(
  passport, 
  username => {
    const queryString = `SELECT * from users WHERE username = "${username}"`
    db.query(queryString)
    .then(result => res.locals.user = result)
    .catch(err => console.log('error in initialize passport', err))
  },
  id => {
    const queryString = `SELECT * from users WHERE user_id = "${id}"`
    db.query(queryString)
    .then(result => res.locals.user = result)
    .catch(err => console.log('error in initialize passport', err))
  }
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(session());

// app.use(passport.initialize());



app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.post('/register', userController.registerUser = (req, res) => {
  res.status(200)
})
app.post('/login', passport.authenticate('local',{
  sucessRedirect: '/',
  failureRedirect: '/'
}))



app.listen(3000, ()=> {
  console.log('Listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/
