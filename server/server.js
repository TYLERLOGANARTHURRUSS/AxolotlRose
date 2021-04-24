const express = require('express');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple');
const passport = require('passport');
const LocalStrategy = require('passport-local').streategy;
const { disconnect } = require('process');

const userController = require('./controllers/userController')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session());

// app.use(passport.initialize());

// app.use(passport.session());

// passport.serializeUser((user, done)=> {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
 
//   });
// });

// passport.use(new LocalStrategy((username, password)=>{

// }))

app.get('/', userController.testConnect, (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})

app.post('/login', (req, res) => {

})

app.listen(3000, ()=> {
  console.log('Listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/