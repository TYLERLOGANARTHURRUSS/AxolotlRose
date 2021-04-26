const db = require('../models/models.js')

const bookController = {};

bookController.addBook = async (req, res, next) => {
  const { title, author, user_id, isbn } = req.body;
  const params = [title, author, user_id, isbn];
  const queryString = `
   INSERT INTO books (title, author, userid, isbn)
   VALUES ($1, $2, $3, $4)
  `
  try {
    const result = await(db.query(queryString, params));
    console.log('result from query', result)
    return next();
  } catch(err){
    console.log('Error in bookController.addBook', err);
    return next();
  }
}

bookController.findBook = async (req, res, next) => {
  const { user_id, isbn } = req.body;
  const params = [isbn];
  const queryString = `
    SELECT * FROM books WHERE isbn=$1;
  `
  try {
    const result = await (db.query(queryString, params));
    res.locals.book = result;
    res.locals.requester= user_id;
    return next();
  } catch(err) {
    console.log('Error in bookController.findBook', err);
    return next();
  }
}


module.exports = bookController;