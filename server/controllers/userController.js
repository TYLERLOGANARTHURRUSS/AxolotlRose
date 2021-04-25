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

userController.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
    res.locals.auth = true
    return next()
  }
  res.locals.auth = false;
}

// userController.checkNotAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()){
//     res.locals.auth = true;
//     return next()
//   }
//   return next();
// }
// userController.verifyUser = async (req, res, next) => {
//   try {

//   }
// }
// userController.testConnect =  (req, res, next) => {
  
//   var conString = "postgres://ujneeeir:fnSCEBl8hgf4INkhrJll4J4AxvbitKqp@queenie.db.elephantsql.com:5432/ujneeeir" //Can be found in the Details page
  
//   Pool.connect(function(err) {
//     if(err) {
//       return console.error('could not connect to postgres', err);
//       return next();
//     }
//     Pool.query('SELECT NOW() AS "theTime"', function(err, result) {
//       if(err) {
//         return console.error('error running query', err);
//       }
//       console.log("connected to db", result.rows[0].theTime);
//       // >> output: 2018-08-23T14:02:57.117Z
//       client.end();
//       return next();
//     });
//   });
// }


module.exports = userController;