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
    return next({error: `Error in bookController.addBook: ${err}`});
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
    console.log('result rows in findBook query', result.rows)
    res.locals.result = result.rows[0];
    res.locals.requester= user_id;
    return next();
  } catch(err) {
    console.log('Error in bookController.findBook', err);
    return next({error: `Error in bookController.findBook: ${err}`});
  }
}

bookController.searchByTitle = async (req, res, next) => {
  //request body will be isbn?  ///no we need to find a way to query our own databse  titles for something close to what we actually hold as title and author
  const { title } = req.body;
  
  let titleArray = title.trim().split(' ')
  let titleQuery = '%';
  titleArray.forEach(el => {
    el = el.toLowerCase()
    firstChar = el[0];
    let string = `${firstChar.toUpperCase() + el.slice(1)}%`
    titleQuery = titleQuery + string;
  });
  const params = [titleQuery]
  const queryString = `SELECT * FROM books WHERE title LIKE $1`
  try {
    const result = await db.query(queryString, params);
    res.locals.books = result.rows
    console.table(result.rows)
    return next()
  } catch(err) {
    next({error: `error in search by title: ${err}`});
  }
  
}



module.exports = bookController;