const db = require('../models/models.js');

const messageController = {};

messageController.sendMessage = async (req, res, next) => {
  const { requester} = res.locals;
  const { userid, title } = res.locals.result;
  const message = `A BookTrader user has requested to read ${title}.  Would you like to trade?`;
  const read = false;
  
  const params = [userid, requester, message, read];
  const queryString = `INSERT INTO messages (_to, _from, message, read)
                       VALUES ($1, $2, $3, $4)`
  try{
    const result = await db.query(queryString, params);
    console.log(result);
    return next();
  } catch(e) {
    console.log('Error in messageController.sendMessage', err);
    return next({error: `Error in messageController.sendMessage: ${err}`});
  }
}

module.exports = messageController;