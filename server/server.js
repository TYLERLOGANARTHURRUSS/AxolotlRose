// if (process.evv.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
require ('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
// const pgSession = require('connect-pg-simple');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').strategy;
// const { disconnect, nextTick } = require('process');
const db = require('./models/models.js')

const userController = require('./controllers/userController')
const app = express();
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');

initializePassport(
  passport, 
  async (username) => {
    const params = [username];
    const queryString = `SELECT * from users WHERE username = $1`;
    return Promise.resolve(db.query(queryString, params));
    // .then(result => {
    //   console.log('result password', result.rows[0].password)
    //   // console.log('result', result.rows)
    //   return result.rows[0]

    // })
    // .catch(err => console.log('error in initialize passport', err));
  },
  id => {
    const params = [id];
    const queryString = `SELECT * from users WHERE user_id = $1`;
    db.query(queryString)
    .then(result => console.log(result))
    .catch(err => console.log('error in initialize passport', err));
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
app.use(methodOverride('_method'))


// app.use(session());

// app.use(passport.initialize());



app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/failure', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'./failure.html'))
})
app.post('/register', userController.registerUser, passport.authenticate('local',{
  sucessRedirect: '/',
  failureRedirect: '/failure',
  failureFlash: true
}), (req, res) => {
  return res.status(200).json({isLoggedIn: true});
})
app.post('/login', passport.authenticate('local',{
  sucessRedirect: '/',
  failureRedirect: '/failure'
  // failureFlash: true

}), userController.checkAuthenticated, (req, res) => {
  return res.status(200).json({isLoggedIn: true});
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.locals.logout = true;
  res.status(200).json(res.locals.logout)
})

app.listen(3000, ()=> {
  console.log('Listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/
