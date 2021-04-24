const db = require('../models/models.js')
// const db = require('pg');
const bcrypt = require('bcryptjs')

const userController = {};

userController.registerUser = async (req, res, next) => {
  const { username, password, name, location } = req.body;

 try {
   const hashedPassword = await bcrypt.hash(password, 10);
   // code to insert hashed password with req.body.username into database
   const queryString = `
   INSERT INTO users (username, password, name, piclink, location)
   VALUES (${username}, ${hashedPassword}, ${name}, ${piclink}, ${location})`
   db.query(queryString,(err, res) => {
    if (err) {
      console.log('error creating user', err)
      return next();
    } else {
      return next();
    }
   })
 }
 catch(e){
   return next({Message: 'Error in userController.registerUser:' + e});
 }
}

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