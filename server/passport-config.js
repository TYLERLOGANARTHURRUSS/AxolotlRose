const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, next) => {
    const user = getUserByUsername(username)
    if (user === null){
      return next(null, false, {message: 'No user with that username'})
    }
    try {
      if (await bcrypt.compare(password, user.password)){
       return next(null, user)
      } else {
          return next(null, false, {message: 'Password incorrect'})
        }
    } catch(e) {
      return next({message: 'error in authenticateUser' + e});
    }

  }
  passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
  passport.serializeUser((user, next) => next(null, user.id))
  passport.deserializeUser((user, next) => {
    return next(null, getUserById(id))
  })
}



module.exports = initialize;