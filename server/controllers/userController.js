const db = require('../models/models.js')
// const db = require('pg');
const bcrypt = require('bcrypt')

const userController = {};

userController.registerUser = async (req, res, next) => {
  const { username, password, name, location } = req.body;
  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

 try {
   // declare query params array for insertion
   const params = [username, hashedPassword, name, location];
   console.log(params)
   const queryString = `
   INSERT INTO users (username, password, name, location)
   VALUES ($1, $2, $3, $4)`
   // calling query method to insert user
   await db.query(queryString, params, (err, res) => {
    if (err) {
      console.log('error creating user', err);
      return next();
    } else {
      console.log('successfully inserted new registered user row');
      console.log(params[0])
      return next();
    }
   })
 }
 catch(e){
   return next(JSON.stringify({Message: 'Error in userController.registerUser:' + e}));
 }
}

// userController.checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()){
//   console.log('req.user in checkAuthenticated', req.user, 'req.session.passport.user', req.session.passport.user) 
//     return next()
//   }
//   // res.locals.auth = false;
//   // res.json(res.locals.auth)
  
//   return next();
// }
// userController.checkNotAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()){
//   console.log('req.user in checkAuthenticated', req.user, 'req.session.passport.user', req.session.passport.user) 
//     res.locals.auth = true;
//     // res.send(res.locals.auth)
//     // res.redirect('/');
//     return next()
//   }
//   return next()
// }

module.exports = userController;