const { Pool } = require('pg');

const PG_URI = "postgres://ujneeeir:fnSCEBl8hgf4INkhrJll4J4AxvbitKqp@queenie.db.elephantsql.com:5432/ujneeeir";

const pool = new Pool({
  connectionString: PG_URI,
});

//for future devs: schema (ish) for the above db will be found in 
//tables.js
pool.on('connect', () => {
  console.log('connected to database')
})

module.exports = {
  pool: pool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};