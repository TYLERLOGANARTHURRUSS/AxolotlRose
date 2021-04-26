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
    const result = await db.query(queryString, params)
    // console.log('result password', result.rows[0].password)
      // console.log('result', result.rows)
    user = result.rows[0]
    if (user === null){
      return done(null, false)
    }
    try {
      if (await bcrypt.compare(password, user.password)){
        console.log('things went okay in bcrypt compare')

       return done(null, user)
      } else {
        const fail = {message: 'Password Incorrect'}
          return done(null, false, fail);
        }
    } catch(e) {
      console.log(e)
      const err = {error: e}
      // done()
      return done(JSON.stringify({message: 'error in authenticateUser ' + e}));
      // return done(null, false, err)
    }

  }
  passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser)); //template for how 
  passport.serializeUser((user, done) => {   //this sets a cookie on the user
    console.log('we are in serializeUser')
    return done(null, user.user_id)
  });  
  passport.deserializeUser( async (id, done) => { //we d't know what this does
    let user;
    console.log('in deserializeuser')
    const params = [id];
    const queryString = `SELECT * from users WHERE user_id = $1`;
    // try{
      const result = await db.query(queryString, params)
      user = result.rows[0]
      return done(null, user.user_id);
    // }
    // catch(e){
    //   console.log(e)
    //   const err = {error: e}
    //   return done(null, false, err)
    // }
  })
}



module.exports = initialize;