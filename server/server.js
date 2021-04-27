require ('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const messageController = require('./controllers/messageController')
const app = express();
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');


initializePassport(passport);

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

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/failure', (req, res) => {
  console.log('in failure get route')
  return res.status(200).sendFile(path.join(__dirname,'../failure.html'))
})
app.post('/register', userController.registerUser, passport.authenticate('local',{
  
  // successRedirect: '/',   // commented out because of the way we are implementing hookrouter
  // failureRedirect: '/'
  // // failureFlash: true
}), (req, res) => {
  console.log('req body user', req.body, 'req.user', req.user)
  return res.status(200).json({userInfo: req.user});
})
app.post('/login', passport.authenticate('local',{
  // successRedirect: '/dashboard',
  // failureRedirect: '/'
  // // failureFlash: true
}),(req, res) => {
  // console.log('req.user', req.user, 'req.session.passport.user', req.session.passport.user)
  return res.status(200).json({userInfo: req.user});
});

app.post('/addBook', bookController.addBook, (req, res)=> {
  return res.sendStatus(200);
});

app.post('/requestBook', bookController.findBook, messageController.sendMessage, (req, res) => {
  return res.sendStatus(200);
});

app.post('/search', bookController.searchByTitle, (req, res) => { //for a requst to return all books held with a certain isbn
  return res.status(200).json(res.locals.books);
});

app.delete('/logout', (req, res) => {
  req.logOut()
  // res.locals.logout = true;
  res.sendStatus(200);
});

app.use((err, req, res, next) => { //universal middlewear error handler
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, ()=> {
  console.log('Listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/
