const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('./models/models.js');


function initialize(passport, getUserByUsername, getUserById){
  const authenticateUser = async (username, password, done) => {
    // const user = getUserByUsername(username);
    let user;
    const params = [username];
    const queryString = `SELECT * from users WHERE username = $1`;
    await db.query(queryString, params)
    .then(result => {
      console.log('result password', result.rows[0].password)
      // console.log('result', result.rows)
      user = result.rows[0]

    })
    // .catch(err => console.log('error in initialize passport', err));
    if (user === null){
      return done(null, false, JSON.stringify({message: 'No user with that username'}))
    }
    try {

      console.log('username', username, 'password', password)
      console.log('user from getUserByUsername Func', user)
      if (await bcrypt.compare(password, user.password)){
        console.log('shit went okay in bcrypt compare')

       return done(null, user)
      } else {
          return done(null, false, JSON.stringify({message: 'Password incorrect'}))
        }
    } catch(e) {
      return done(JSON.stringify({message: 'error in authenticateUser ' + e}));
    }

  }
  passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser)); //template for how 
  passport.serializeUser((user, done) => {   //this sets a cookie on the user
    console.log('we are in serializeUser')
    done(null, user.user_id)
  });  
  passport.deserializeUser((id, done) => { //we d't know what this does
    let user;
    console.log('in deserializeuser')
    const params = [id];
    const queryString = `SELECT * from users WHERE user_id = $1`;
    db.query(queryString, params)
    .then(result => {
      // console.log('result password', result.rows[0].password)
      console.log('result', result.rows)
      user = result.rows[0]
      return done(null, user.user_id);
    })
  })
}



module.exports = initialize;